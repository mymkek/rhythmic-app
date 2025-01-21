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
        <div className="relative">
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
            <div className="relative h-9 mx-2">

                {marks.map((mark, i, array) => (
                    <React.Fragment key={i}>
                        <div className="absolute w-px bg-amber-50" style={{
                            left: `${(i / (array.length - 1)) * 100}%`,
                            height: (i + 1) % 10 === 0 || i === 0 || i === array.length - 1 ? 15 : 10
                        }}/>
                        <div className="absolute w-7 text-center top-4 text-sm text-gray-500"
                             style={{
                                 left: `calc(${(i / (array.length - 1)) * 100}% - 14px)`,
                             }}>
                            {mark}
                        </div>
                    </React.Fragment>

                ))}
            </div>

        </div>
    );
};