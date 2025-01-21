"use client"

import React, {useEffect, useRef, useState} from "react";

import {useMetronomeState} from "@/features/metronome/model";
import {useMIDIAccess, useMidiRecorderStore} from "@/shared/lib/midi-provider";

import {BarCanvas} from "./bar-roll-canvas";
import {GridCanvas} from "./grid-canvas";

export const BarRoll = () => {


    // @TODO перенести это в отдельный контейнер
    const {dispatchEvent: dispatchMidiEvent} = useMidiRecorderStore();
    const { midiAccess, isMIDIAccessGranted } = useMIDIAccess();
    useEffect(() => {
        if(midiAccess) {
            for (const input of midiAccess.inputs.values()) {
                input.onmidimessage = dispatchMidiEvent;
            }
        }
    }, [midiAccess, dispatchMidiEvent]);

    // --------

    const {barPattern} = useMetronomeState();
    const timeSignature = barPattern.length;

    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(300);

    useEffect(() => {
        const container = containerRef.current;
        if(container?.scrollWidth) {
            setWidth(container?.scrollWidth)
        }
    }, []);

    return (
        <div ref={containerRef} className="bg-amber-50 relative" style={{height: height}}>
            <GridCanvas width={width} height={height} rows={timeSignature}/>
            <BarCanvas width={width} height={height}/>
        </div>
    )
};
