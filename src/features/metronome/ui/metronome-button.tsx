"use client"
import React from "react";

import {useMetronomeState} from "../model";



export const MetronomeButton = () => {

    const {toggleStarted, barPattern, tempo, isStarted} = useMetronomeState();

    return (
        <button onClick={toggleStarted} className="p-4 border-2">
            {isStarted ? "Stop" : "Start"} {tempo} BPM, {barPattern.length}/4
        </button>
    )
};