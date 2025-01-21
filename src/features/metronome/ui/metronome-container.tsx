"use client"
import React, {ReactNode} from "react";

import {useMetronomeState} from "../model";



type ContainerProps = {
    children: ReactNode | ReactNode[];
}

export const Metronome = ({children}:ContainerProps) => {

    const {toggleStarted, barPattern, tempo, isStarted} = useMetronomeState();

    return (
        <div className="grid grid-cols-1 gap-4">
            {children}
            <button onClick={toggleStarted} className="p-4 border-2">
                {isStarted ? "Stop" : "Start"} {tempo} BPM, {barPattern.length}/4
            </button>
        </div>
    )
};