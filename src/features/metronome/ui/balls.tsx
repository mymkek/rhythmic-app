"use client"

import React from "react";

import {useMetronomeState} from "@/features/metronome/model";
import {MetronomeBarComponent} from "@/features/metronome/ui/metronome-bar";


export const Balls = () => {

    const {barPattern, currentBar} = useMetronomeState();

    return (
        <div className="flex justify-center">
            {barPattern?.map((item, index) =>
                <MetronomeBarComponent isActive={index === currentBar}
                                       key={index}/>
            )}
        </div>
    )
};