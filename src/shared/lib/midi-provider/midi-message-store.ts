import {create} from "zustand/index";

export interface MidiMessageStore {
    currentNotes: Set<number>;
    dispatchEvent: (message: MIDIMessageEvent) => void;
}

export const useMidiMessageStore = create<MidiMessageStore>((set) => ({
    currentNotes: new Set([]),
    dispatchEvent: (message) => {
        if (!message.data) return;
        const note = message.data[1];
        const messageType = message.data[0] === 144 ? 'on' : message.data[0] === 128 ? 'off' : 'other';

        switch (messageType) {
            case 'on':
                set((state) => {
                    state.currentNotes.add(note);
                    return { currentNotes: new Set(state.currentNotes) };
                });
                break;
            case 'off':
                set((state) => {
                    state.currentNotes.delete(note);
                    return { currentNotes: new Set(state.currentNotes) };
                });
                break;
            default:
                break;
        }
    },
}));