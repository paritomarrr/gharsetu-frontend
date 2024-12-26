import React, { useState, useEffect, useRef } from 'react';
import { minBudget, maxBudget } from '../../utils/HardCodedData';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react';
import { convertPriceToWords } from '../../helperFunctions/basicHelpers';

const PriceRange = ({budget, setBudget}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const maxBudget = 10000000
    const minBudget = 0
    const dropdownRef = useRef(null);
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
                        <div className='flex justify-between'>
                            <div className='text-xs font-semibold'>
                                <div> Min </div>
                                <div> {convertPriceToWords(budget.min)} </div>
                            </div>
                            <div className='text-xs font-semibold'>
                                <div> Max </div>
                                <div> {convertPriceToWords(budget.max)} </div>
                            </div>
                        </div>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            defaultValue={[200000, 5000000]}
                            min={minBudget}
                            max={maxBudget}

                            onChangeEnd={(val) => {
                                setBudget({ min: val[0], max: val[1] });
                            }}
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
