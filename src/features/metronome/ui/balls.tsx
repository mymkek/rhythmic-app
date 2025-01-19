"use client"

import React from "react";

import {useMetronomeState} from "@/features/metronome/model/metronome-state";
import {MetronomeBarComponent} from "@/features/metronome/ui/metronome-bar";


export const Balls = () => {

    const {state, currentBarIndex} = useMetronomeState();


    return (
        <div className="flex justify-center">
            {state?.map((item, index) =>
                <MetronomeBarComponent type={state[currentBarIndex].type} isActive={index === currentBarIndex}
                                       key={item.id}/>
            )}
        </div>
    )
};