import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatePropertyForm } from "../../store/slices/PropertyFormSlice";
import { backend_url } from "../../config";
import { getCoordinates } from "../../helperFunctions/MapHelpers";

const LocalityDropDown = ({ propertyForm, handleAddressChange, setLatitude, setLongitude }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        const getLocalitySuggestions = async () => {
            if (!searchValue || searchValue.length <= 2) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                // const res = await axios.post(
                //     `${backend_url}/api/v1/localitySuggestions/suggestPlaces`,
                //     { query: searchValue }
                // );
                const res = await axios.post(`${backend_url}/api/v1/localitySuggestions/suggestPlaces`, { query: searchValue });


                if (res.data.success) {
                    setSuggestions(res.data.response.suggestions);
                } else {
                    setSuggestions([]);
                }
            } catch (err) {
                setError("Failed to fetch suggestions");
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(getLocalitySuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    const handleBlur = () => {
        // Delay hiding the dropdown to allow click events to process
        setTimeout(() => setShowDropdown(false), 150);
    };

    const handleSelectSuggestion = async (suggestion) => {

        const coordinates = await getCoordinates(suggestion.name+','+suggestion.place_formatted);


        dispatch(updatePropertyForm({
            address: {
                locality: suggestion.name,
                city: suggestion.context.place.name,
                state: suggestion.context.region.name,
            },
            coordinates: {
                latitude: coordinates[1],
                longitude: coordinates[0]
            }
        }));
        setLatitude(coordinates[1]);
        setLongitude(coordinates[0]);
        setSearchValue(suggestion.name);
        setShowDropdown(false)
    }

    return (
        <div className="relative">
            <div
                className="flex flex-col gap-1"
                onFocus={() => setShowDropdown(true)}
                onBlur={handleBlur}
            >
                <input
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter locality"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {propertyForm?.showError && !propertyForm?.address?.locality && (
                    <span className="text-red-500 text-sm">Locality is required</span>
                )}
                <span className="text-gray-500 text-xs">
                    This helps us display your listing to the right audience based on
                    location.
                </span>
            </div>

            {showDropdown && searchValue.length > 2 && (
                <div className="absolute bg-white shadow-lg border border-gray-200 w-full rounded-md p-2 z-50 top-12">
                    {isLoading && <div className="p-2 text-gray-500">Loading...</div>}
                    {error && <div className="p-2 text-red-500">{error}</div>}
                    {!isLoading && !error && suggestions.length === 0 && (
                        <div className="p-2 text-gray-500">No suggestions found</div>
                    )}
                    {!isLoading &&
                        !error &&
                        suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectSuggestion(suggestion)}
                                className="cursor-pointer p-2 hover:bg-gray-100">
                                <div className="font-semibold "> {suggestion.name} </div>
                                <div className="text-sm text-gray-600"> {suggestion.place_formatted} </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default LocalityDropDown;
