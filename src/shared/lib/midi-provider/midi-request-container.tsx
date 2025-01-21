"use client"

import {useEffect} from "react";

import {useMidiMessageStore, useMIDIAccess} from "@/shared/lib/midi-provider";

type MidiRequestContainerProps = {
    children: React.ReactNode;
}

export const MidiRequestContainer = ({children}: MidiRequestContainerProps) => {

    const {dispatchEvent: dispatchMidiEvent} = useMidiMessageStore();


    const { midiAccess, isMIDIAccessGranted } = useMIDIAccess();

    useEffect(() => {
        if(midiAccess) {
            for (const input of midiAccess.inputs.values()) {
                input.onmidimessage = dispatchMidiEvent;
            }
        }
    }, [midiAccess]);


    if(!midiAccess) {
        return <div>
            Midi access required
        </div>
    }

    if(!isMIDIAccessGranted) {
        return <div>
            Error: MIDI access disabled
        </div>
    }

    return children;
};