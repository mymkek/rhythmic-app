"use client"


import {useMIDIAccess} from "@/shared/lib/midi-provider/midi";

type MidiRequestContainerProps = {
    children: React.ReactNode;
}

export const MidiRequestContainer = ({children}: MidiRequestContainerProps) => {

    const handleMIDIMessage = (msg: MIDIMessageEvent) => {
        console.log(msg.data);
    };

    const midiAccess = useMIDIAccess(handleMIDIMessage);

    if(midiAccess.isPending) {
        return <div>
            Midi access required
        </div>
    }

    if(!midiAccess.isMIDIAccessGranted) {
        return <div>
            Error: MIDI access disabled
        </div>
    }

    console.log(midiAccess)

    return (
        children
    )
};