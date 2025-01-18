"use client"

import React from "react";

import {MAX_TEMPO, MIN_TEMPO} from "@/features/metronome/constants";
import {useMetronomeState} from "@/features/metronome/model/metronome-state";
import {ChangeNumericValueHandler} from "@/features/metronome/ui/types";
import {RangeSlider} from "@/shared/ui/inputs/range/range-slider";


export const SettingsForm = () => {

    const {tempo, setTempo, timeSignature, setTimeSignature} = useMetronomeState();

    const handleChangeTempo: ChangeNumericValueHandler = (operation, value) => {
        const tempoChanges = operation === "add" ? value : 0 - value;

        if (tempo + tempoChanges > MAX_TEMPO) {
            return MAX_TEMPO;
        }

        if (tempo + tempoChanges < 1) {
            return 1;
        }

        setTempo(tempo + tempoChanges);
    }

    const handleChangeTimeSignature: ChangeNumericValueHandler = (operation, value) => {
        if (timeSignature === 1 && operation === "remove") {
            return;
        }

        const timeSignatureChanges = operation === "add" ? value : 0 - value;

        setTimeSignature(timeSignature + timeSignatureChanges);
    }

    const increaseTempo = () => {
        handleChangeTempo("add", 1);
    }

    const decreaseTempo = () => {
        handleChangeTempo("remove", 1);
    }

    const increaseTimeSignature = () => {
        handleChangeTimeSignature("add", 1);
    }

    const decreaseTimeSignature = () => {
        handleChangeTimeSignature("remove", 1);
    }

    const handleChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);

        if (newValue) {
            setTempo(newValue);
        }
    }

    const getSliderMarks = (step: number) => {
        const stepsCount = Math.floor((MAX_TEMPO - MIN_TEMPO) / step) + 1;

        return new Array(stepsCount).fill(0).map((_, i) => step * (i + 1))
    }

    return (
        <div>
            <div className="flex">
                <h3>tempo</h3>
                <div className="flex">
                    <button onClick={decreaseTempo}>- 1</button>
                    <button onClick={increaseTempo}>+ 1</button>
                </div>

                <h3>time signature</h3>
                <div className="flex">

                    <button onClick={decreaseTimeSignature}>- 1</button>
                    <button onClick={increaseTimeSignature}>+ 1</button>
                </div>
            </div>


            <RangeSlider min={MIN_TEMPO} max={MAX_TEMPO} value={tempo} onChange={handleChangeSlider}
                         marks={getSliderMarks(20)}/>
        </div>
    )
};
