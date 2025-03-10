import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { backend_url } from '../../config';

const LocationDropDown = ({ setSearchLocation, searchLocation }) => {
    const navigate = useNavigate();
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({
        locations: [],
        success: false,
        count: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams(); // Add this line to get current search parameters

    useEffect(() => {
        const dropdownFetch = async () => {
            if (!searchQuery.trim()) {
                setSearchResults({ locations: [], success: false, count: 0 });
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(
                    `${backend_url}/api/v1/properties/searchArea?searchQuery=${encodeURIComponent(searchQuery)}`
                );
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setSearchResults({ locations: [], success: false, count: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(dropdownFetch, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleNavigation = (location) => {
        let locality = location.localities?.[0]?.trim() || "";
        let city = location.city?.trim() || "";
        let state = location.state?.trim() || "";

        // Ensure correct spacing & formatting (avoid double spaces, misplaced commas)
        let searchString = `${locality}, ${city}, ${state}`.replace(/\s+/g, ' ').trim();

        // Encode for URL
        const encodedSearchString = encodeURIComponent(searchString);
        const currentParams = Object.fromEntries(searchParams);

        navigate(`/properties/buy?search=${encodedSearchString}&minPrice=${currentParams.minPrice || ''}&maxPrice=${currentParams.maxPrice || ''}`);
    };

    const renderLocationItem = (location) => {
        const locality = location.localities[0] || '';
        const fullAddress = `${locality}, ${location.city}, ${location.state}`;

        return (
            <div
                key={`${location.city}-${locality}`}
                className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-150"
                onClick={() => {
                    setSearchLocation(location);
                    setSearchQuery(locality);
                    setSearchFocused(false);
                }}
            >
                <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{locality || location.city}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{fullAddress}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative">
            <div
                className={`
                    transition-all duration-500 ease-in-out
                    ${searchFocused ? 'w-[300px]' : 'w-[200px]'}
                `}
            >
                <div className="text-xs font-semibold">Where</div>
                <input
                    type="text"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={(e) => {
                        // Keep dropdown open when interacting with results
                        setTimeout(() => setSearchFocused(false), 200);
                    }}
                    placeholder="Find your dream home"
                    className="text-sm focus:outline-none w-full "
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div
                className={`
                    absolute top-14 left-0 rounded-lg bg-white w-full shadow-md
                    transition-all duration-500 ease-in-out overflow-hidden z-10
                    ${searchFocused ? 'max-h-[200px] opacity-100 p-2' : 'max-h-0 opacity-0 p-0'}
                `}
            >
                {isLoading ? (
                    <div className="px-4 text-center text-gray-500">Loading...</div>
                ) : searchResults.success && searchResults.locations.length > 0 ? (
                    <div className="flex flex-col gap-1">{searchResults.locations.map(renderLocationItem)}</div>
                ) : (
                    <div className="px-4 py-2 text-left text-gray-500">
                        Start typing...
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationDropDown;
