"use client"

import React from "react";

import {useMetronomeState} from "@/features/metronome/model/metronome-state";
import {MidiRequestContainer} from "@/shared/lib/midi-provider";



export const BarRoll = () => {

    const { tempo, state } = useMetronomeState();

    return (
        <MidiRequestContainer>
            <div className="bg-amber-50 w-full h-80 relative">
                {new Array(state.length).fill(null).map((_, i) => (
                    <div key={i} className="h-full top-0 w-0.5 absolute border-l-2 border-amber-600 border-dotted" style={{
                        right: i / state.length * 100 + "%",
                        width: 100 / state.length + "%",
                    }}>
                        {new Array(4).fill(null).map((__, j) => (
                            <div className="h-full w-0.5 absolute border-r-2 border-amber-200 border-dotted" style={{
                                right: j / 4 * 100 + "%"
                            }}>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </MidiRequestContainer>
    )
};
