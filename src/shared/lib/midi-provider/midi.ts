import {useCallback, useEffect, useState} from "react";
import {useBoolean} from "usehooks-ts";

export const useMIDIAccess = (callback: (msg: MIDIMessageEvent) => void) => {
    const isMIDIAccessGranted = useBoolean(false);
    const isPending = useBoolean(true);
    const [midiAccess, setMIDIAccess] = useState<MIDIAccess | null>(null);

    const memoizedCallback = useCallback(callback, [])

    useEffect(() => {
        navigator.requestMIDIAccess()
            .then((midiAccess) => {
                isMIDIAccessGranted.setTrue();
                setMIDIAccess(midiAccess);

                // Устанавливаем обработчики MIDI-сообщений
                for (const input of midiAccess.inputs.values()) {
                    input.onmidimessage = callback;
                }
            })
            .catch((error) => {
                console.error('Failed to get MIDI access:', error);
                isMIDIAccessGranted.setFalse();
            })
            .finally(() => {
                isPending.setFalse();
            })
    }, [memoizedCallback]);

    return {isMIDIAccessGranted: isMIDIAccessGranted.value, isPending: isPending.value, midiAccess};
};