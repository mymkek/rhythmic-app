import React, {ChangeEventHandler} from "react";

export type RangeSliderProps = {
    value: number;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    min: number;
    max: number;
    marks: number[];
}

export const RangeSlider = ({value, onChange, min, max, marks}: RangeSliderProps) => {
    return (
        <div className="relative mb-6">
            <label htmlFor="labels-range-input" className="sr-only">
                Labels range
            </label>
            <input
                id="labels-range-input"
                type="range"
                value={value}
                min={min}
                max={max}
                onChange={onChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex w-full justify-between">
                {marks.map((mark, i) => (
                    <span key={i} className="text-sm text-gray-500 dark:text-gray-400">
                    {mark}
                </span>
                ))}
            </div>

        </div>
    );
};