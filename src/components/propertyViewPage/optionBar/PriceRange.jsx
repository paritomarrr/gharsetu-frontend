import React, { useState, useEffect } from 'react';
import { Input } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from "@chakra-ui/react";
import { useSearchParams } from 'react-router-dom';
import { minBudget, maxBudget } from '../../../utils/HardCodedData';

const PriceRange = ({ reset }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [budget, setBudget] = useState({
        min: searchParams.get('minPrice') || '',
        max: searchParams.get('maxPrice') || ''
    });
    const [dropdownOpen, setDropdownOpen] = useState({
        min: false,
        max: false
    });

    useEffect(() => {
        if (reset) {
            setBudget({ min: '', max: '' });
            setDropdownOpen({ min: false, max: false });
        }
    }, [reset]);

    const filteredMaxBudget = maxBudget.filter(option => {
        const minValue = parseFloat(budget.min) || 0;
        return option.value > minValue;
    });

    const handleInputChange = (e, type) => {
        const newValue = e.target.value;
        setBudget(prev => ({
            ...prev,
            [type]: newValue,
            ...(type === 'min' && parseFloat(newValue) >= parseFloat(prev.max) ? { max: '' } : {})
        }));
    };

    const handleOptionClick = (option, type) => {
        setBudget(prev => ({
            ...prev,
            [type]: option.value,
            ...(type === 'min' && option.value >= parseFloat(prev.max) ? { max: '' } : {})
        }));
        setDropdownOpen(prev => ({
            ...prev,
            [type]: false
        }));
    };

    const handleApplyFilter = () => {
        const currentParams = Object.fromEntries(searchParams);
        setSearchParams({
            ...currentParams,
            minPrice: budget.min,
            maxPrice: budget.max
        });
        setDropdownOpen({ min: false, max: false });
        // Close the dropdown
        document.body.click();
    };

    const handleInputFocus = (type) => {
        setDropdownOpen(prev => ({
            ...prev,
            [type]: true
        }));
    };

    const handleInputBlur = (type) => {
        setTimeout(() => {
            setDropdownOpen(prev => ({
                ...prev,
                [type]: false
            }));
        }, 200);
    };

    return (
        <Menu closeOnSelect={false}>
            <MenuButton>
                <div className="flex border-[1px] border-gray-300 py-2 rounded-md px-2 items-center text-sm">
                    <span className="whitespace-nowrap">
                        {budget.min && budget.max ? `₹${budget.min} - ₹${budget.max}` : 'Price Range'}
                    </span>
                    <ChevronDown size={20} />
                </div>
            </MenuButton>
            <MenuList className="p-4 min-w-[300px]">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-end">
                        <div className="flex flex-col gap-2 relative flex-1">
                            <div className="font-semibold text-sm">Minimum</div>
                            <Input
                                type="number"
                                value={budget.min}
                                onChange={(e) => handleInputChange(e, 'min')}
                                onFocus={() => handleInputFocus('min')}
                                onBlur={() => handleInputBlur('min')}
                                placeholder="Min price"
                            />
                            {dropdownOpen.min && (
                                <ul className="absolute z-10 top-full w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                                    {minBudget.map((option) => (
                                        <li
                                            key={option.id}
                                            onClick={() => handleOptionClick(option, 'min')}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {option.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="flex items-center pb-2">-</div>
                        <div className="flex flex-col gap-2 relative flex-1">
                            <div className="font-semibold text-sm">Maximum</div>
                            <Input
                                type="number"
                                value={budget.max}
                                onChange={(e) => handleInputChange(e, 'max')}
                                onFocus={() => handleInputFocus('max')}
                                onBlur={() => handleInputBlur('max')}
                                placeholder="Max price"
                                isDisabled={!budget.min}
                            />
                            {dropdownOpen.max && budget.min && (
                                <ul className="absolute z-10 top-full w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                                    {filteredMaxBudget.map((option) => (
                                        <li
                                            key={option.id}
                                            onClick={() => handleOptionClick(option, 'max')}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {option.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <Button
                        onClick={handleApplyFilter}
                        colorScheme="blue"
                        className="w-full"
                        isDisabled={!budget.min || !budget.max}
                    >
                        Apply Filters
                    </Button>
                </div>
            </MenuList>
        </Menu>
    );
};

export default PriceRange;