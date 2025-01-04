import React, { useState, useEffect, useRef } from 'react';
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react';
import { convertPriceToWords } from '../../helperFunctions/basicHelpers';

const PriceRange = ({ budget, setBudget, propertyType }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    console.log('propertyType', propertyType);

    const getDefaultRange = () => {
        if (propertyType === 'rent') {
            return [5000, 50000];
        }
        return [200000, 5000000];
    };

    const [range, setRange] = useState(getDefaultRange());

    useEffect(() => {
        const newRange = getDefaultRange();
        setRange(newRange);
        setBudget({ min: newRange[0], max: newRange[1] });
    }, [propertyType]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className={`
                    transition-all duration-500 ease-in-out
                    ${dropdownOpen ? 'w-[300px]' : 'w-[200px]'}
                `}
            >
                <div className="text-xs font-semibold"> Price Range </div>
                <input
                    type="text"
                    onFocus={() => setDropdownOpen(true)}
                    placeholder="Set your budget"
                    value={`${convertPriceToWords(budget.min)} - ${convertPriceToWords(budget.max)}`}
                    className="text-sm focus:outline-none w-full"
                />
            </div>
            {dropdownOpen && (
                <div
                    className={`
                        absolute top-14 left-0 rounded-lg bg-white w-full shadow-md
                        transition-all duration-500 ease-in-out overflow-hidden z-10
                        max-h-[200px] opacity-100 p-2
                    `}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs font-semibold">
                                <div> Min </div>
                                <div> {convertPriceToWords(budget.min)} </div>
                            </div>
                            <div className="text-xs font-semibold">
                                <div> Max </div>
                                <div> {convertPriceToWords(budget.max)} </div>
                            </div>
                        </div>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            value={range}
                            min={propertyType === 'rent' ? 0 : 0}
                            max={propertyType === 'rent' ? 100000 : 150000000}
                            onChange={(val) => setRange(val)}
                            onChangeEnd={(val) => {
                                setBudget({ min: val[0], max: val[1] });
                            }}
                            step={5000}
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                        </RangeSlider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceRange;