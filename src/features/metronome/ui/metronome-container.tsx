"use client"

import React, {ReactNode, useEffect} from "react";
import {useInterval} from "usehooks-ts";

import {useMetronomeState} from "@/features/metronome/model/metronome-state";
import {AudioPlayer} from "@/shared/lib/audio-player";


type ContainerProps = {
    children: ReactNode | ReactNode[];
}

export const Metronome = ({children}:ContainerProps) => {

    const {tempo, timeSignature, resetState, updateBarIndex, isStarted, toggleStart} = useMetronomeState();


    const handleUpdateBar = () => {
        AudioPlayer.playSound("metronome_1");
        updateBarIndex();
    }


    useEffect(() => {
        if (isStarted) {
            handleUpdateBar();
        } else {
            resetState();
        }
    }, [isStarted]);

    useInterval(
        handleUpdateBar,
        isStarted ? (60000 / tempo) : null,
    );


    return (
        <div className="grid grid-cols-1 gap-4">
            {children}
            <button onClick={toggleStart} className="p-4 border-2">
                {isStarted ? "Stop" : "Start"} {tempo} BPM, {timeSignature}/4
            </button>
        </div>
    )
};