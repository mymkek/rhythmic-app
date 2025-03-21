'use client';

import React from 'react';

import { MAX_TEMPO, MIN_TEMPO } from '@/features/metronome/constants';
import { useMetronomeState } from '@/features/metronome/model';
import { Button } from '@/shared/ui/inputs/button';
import { RangeSlider } from '@/shared/ui/inputs/range/range-slider';

export const SettingsForm = () => {
  const { tempo, setTempo, increaseBarPattern, decreaseBarPattern } = useMetronomeState();

  const changeTempo = (delta: number) => {
    setTempo(tempo + delta);
  };

  const handleChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    if (newValue) {
      setTempo(newValue);
    }
  };

  const getSliderMarks = (step: number) => {
    const stepsCount = Math.floor((MAX_TEMPO - MIN_TEMPO) / step) + 1;

    return new Array(stepsCount).fill(0).map((_, i) => step * (i + 1));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="flex gap-1">
          <Button onClick={() => changeTempo(-10)}>- 10</Button>
          <Button onClick={() => changeTempo(-1)}>- 1</Button>
        </div>

        <div className="col-start-3 flex justify-end gap-1">
          <Button onClick={() => changeTempo(1)}>+ 1</Button>
          <Button onClick={() => changeTempo(10)}>+ 10</Button>
        </div>

        <div className="col-span-3">
          <RangeSlider
            min={MIN_TEMPO}
            max={MAX_TEMPO}
            value={tempo}
            onChange={handleChangeSlider}
            marks={getSliderMarks(20)}
          />
        </div>
      </div>

      <div>
        <h3>time signature</h3>
        <div className="flex gap-1">
          <Button onClick={decreaseBarPattern}>- 1</Button>
          <Button onClick={increaseBarPattern}>+ 1</Button>
        </div>
      </div>
    </>
  );
};
