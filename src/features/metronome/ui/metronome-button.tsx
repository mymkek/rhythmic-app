"use client"
import React from "react";

import {useMetronomeState} from "../model";
import {PauseIcon, PlayIcon} from "@heroicons/react/16/solid";


export const MetronomeButton = () => {

    const {toggleStarted, barPattern, tempo, isStarted} = useMetronomeState();

    return (
        <button onClick={toggleStarted} className="cursor-pointer">
            {isStarted ?
                <PauseIcon className="size-36 text-primary-500"/>
                :
                <PlayIcon className="size-36 text-primary-500"/>
            }
        </button>
    )
};