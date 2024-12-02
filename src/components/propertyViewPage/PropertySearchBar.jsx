import React, { useEffect, useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { backend_url } from '../../config';

const PropertySearchBar = ({ searchQuery, setSearchQuery, selectedMode }) => {
    const navigate = useNavigate()
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchResults, setSearchResults] = useState({
        locations: [],
        success: false,
        count: 0
    });
    const [isLoading, setIsLoading] = useState(false);

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
        console.log('location', location);
        const searchComponents = [
          location.localities?.[0]?.replace(/\s+/g, ''),
          location.city?.replace(/\s+/g, ''),
          location.state?.replace(/\s+/g, '')
        ].filter(Boolean);
        
        const searchString = searchComponents.join('+');
        console.log('searchString', searchString);
        navigate(`/properties/${selectedMode}?search=${searchString}`);
      };

    const renderLocationItem = (location) => {
        const locality = location.localities[0] || '';
        const fullAddress = `${locality}, ${location.city}, ${location.state}`;

        return (
            <div
                key={`${location.city}-${locality}`}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => {
                    handleNavigation(location)
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
                            {location.city}, {location.state}
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
                    ) : searchResults.success && searchResults.locations.length > 0 ? (
                        <div className="py-2">
                            {searchResults.locations.map(renderLocationItem)}
                        </div>
                    ) : (
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