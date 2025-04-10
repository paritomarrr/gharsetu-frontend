import React, { useEffect, useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { backend_url } from '../../config';

const PropertySearchBar = ({ searchQuery, setSearchQuery, selectedMode }) => {
    const navigate = useNavigate();
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchResults, setSearchResults] = useState({
        locations: [],
        success: false,
        count: 0
    });
    const [localitySuggestions, setLocalitySuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setSearchQuery('');
        const currentParams = Object.fromEntries(searchParams);
        const { search, ...remainingParams } = currentParams;
        const newSearchParams = new URLSearchParams(remainingParams).toString();
        navigate(`/properties/${selectedMode}?${newSearchParams}`);
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            if (!searchQuery.trim()) {
                setSearchResults({ locations: [], success: false, count: 0 });
                return;
            }

            setIsLoading(true);
            try {
                const propertiesResponse = await fetch(
                    `${backend_url}/api/v1/properties/searchArea?searchQuery=${encodeURIComponent(searchQuery)}`
                );
                const propertiesData = await propertiesResponse.json();

                if (propertiesData.success) {
                    setSearchResults({ locations: propertiesData.locations, success: true, count: propertiesData.locations.length });
                } else {
                    setSearchResults({ locations: [], success: false, count: 0 });
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                setSearchResults({ locations: [], success: false, count: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchProperties, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        const fetchMainPlaceSuggestions = async () => {
            if (!searchQuery.trim()) {
                setLocalitySuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(
                    `${backend_url}/api/v1/localitySuggestions/suggestMainPlaces`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ query: searchQuery }),
                    }
                );

                const data = await response.json();

                if (data.success) {
                    setLocalitySuggestions(data.response.suggestions);
                } else {
                    setLocalitySuggestions([]);
                }
            } catch (error) {
                console.error('Error fetching main place suggestions:', error);
                setLocalitySuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMainPlaceSuggestions();
    }, [searchQuery]);

    const handleNavigation = (location) => {
        const locality = location.name || location.localities?.[0] || '';
        const city = location.context?.place?.name || location.city || '';
        const state = location.context?.region?.name || location.state || '';

        const searchString = `${locality}, ${city}, ${state}`.replace(/\s+/g, ' ').trim();

        const encodedSearchString = encodeURIComponent(searchString);
        const currentParams = Object.fromEntries(searchParams);
        const minPriceParam = currentParams.minPrice ? `&minPrice=${currentParams.minPrice}` : '';
        const maxPriceParam = currentParams.maxPrice ? `&maxPrice=${currentParams.maxPrice}` : '';

        navigate(`/properties/${selectedMode}?search=${encodedSearchString}${minPriceParam}${maxPriceParam}`);
    };
    
    const renderLocationItem = (location) => {
        const locality = location.name || 'Unnamed Locality';
        const city = location.context?.find(item => item.id.startsWith('place'))?.text || 'Unnamed City';
        const state = location.context?.find(item => item.id.startsWith('region'))?.text || 'Unnamed State';
        const fullAddress = `${locality}, ${city}, ${state}`.trim();

        return (
            <div
                key={`${city}-${locality}`}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => {
                    handleNavigation(location);
                    setSearchQuery(locality);
                    setSearchFocused(false);
                }}
            >
                <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                            {locality}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                            {fullAddress}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full max-w-2xl">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                    type="text"
                    className="w-full border border-gray-300 py-2 pl-10 px-2 text-sm focus:outline-none shadow-sm rounded-md"
                    placeholder="Search for Localities"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                />
            </div>
            {searchFocused && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
                    {isLoading ? (
                        <div className="px-4 py-3 text-center text-gray-500">
                            Loading...
                        </div>
                    ) : searchResults.success && searchResults.locations.length > 0 && (
                        <div className="py-2">
                            {searchResults.locations.map((location, index) => (
                                <div
                                    key={`property-${location.id || index}`}
                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                    onClick={() => {
                                        handleNavigation(location);
                                        setSearchQuery(location.localities?.[0] || '');
                                        setSearchFocused(false);
                                    }}
                                >
                                    <div className="flex items-start">
                                        <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">
                                                {location.localities?.[0] || 'Unnamed Locality'}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {`${location.city || 'Unnamed City'}, ${location.state || 'Unnamed State'}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {localitySuggestions.length > 0 && (
                        <div className="py-2">
                            {localitySuggestions.map((suggestion, index) => (
                                <div
                                    key={`suggestion-${suggestion.name || 'Unnamed'}-${index}`}
                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                    onClick={() => {
                                        handleNavigation(suggestion);
                                        setSearchQuery(suggestion.name);
                                        setSearchFocused(false);
                                    }}
                                >
                                    <div className="flex items-start">
                                        <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">
                                                {suggestion.name || 'Unnamed Locality'}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {suggestion.place_formatted || 'Unnamed City, Unnamed State'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!isLoading && searchResults.locations.length === 0 && localitySuggestions.length === 0 && (
                        <div className="px-4 py-6 text-center text-gray-500">
                            Start typing to search for localities
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PropertySearchBar;