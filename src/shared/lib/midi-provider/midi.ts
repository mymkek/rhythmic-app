import {useEffect, useState} from "react";
import {useBoolean} from "usehooks-ts";

export const useMIDIAccess = () => {
    const isMIDIAccessGranted = useBoolean(false);
    const [midiAccess, setMIDIAccess] = useState<MIDIAccess | null>(null);

    useEffect(() => {
        navigator.requestMIDIAccess()
            .then((midiAccess) => {
                isMIDIAccessGranted.setTrue();
                setMIDIAccess(midiAccess);
            })
            .catch((error) => {
                console.error('Failed to get MIDI access:', error);
                isMIDIAccessGranted.setFalse();
            })
    }, []);

    return {isMIDIAccessGranted: isMIDIAccessGranted.value, midiAccess};
};