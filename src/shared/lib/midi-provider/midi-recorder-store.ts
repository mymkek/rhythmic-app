import {create} from "zustand/index";
import {subscribeWithSelector} from "zustand/middleware";

export interface MidiRecorderStore {
    isRecording: boolean
    data: Array<Omit<MIDIMessageEvent, "data"> & { data: MIDIMessageEvent["data"] }>
    currentNotes: Map<number, number>
    dispatchEvent: (message: MIDIMessageEvent) => void
    clearData: () => void
    start: () => void
    stop: () => void
    recycle: () => void
}

export const useMidiRecorderStore = create<MidiRecorderStore>()(
    subscribeWithSelector((set, getState) => ({
        isRecording: false,
        data: [],
        currentNotes: new Map(),
        dispatchEvent: (message) => {
            const { isRecording } = getState();
            if (!message.data) return;

            set({ data: [...getState().data, message] });
            const [status, note] = message.data;

            switch (status) {
                case 144: // Note On
                    set(({ currentNotes }) => {
                        const updatedNotes = new Map(currentNotes);
                        updatedNotes.set(note, performance.now());
                        return { currentNotes: updatedNotes };
                    });
                    break;

                case 128: // Note Off
                    set(({ currentNotes }) => {
                        const updatedNotes = new Map(currentNotes);
                        updatedNotes.delete(note);
                        return { currentNotes: updatedNotes };
                    });
                    break;

                default:
                    break;
            }
        },
        clearData: () => {
            if(getState().data.length) {
                set({data: []})
            }
        },
        start: () => {
            set({isRecording: true})
        },
        stop: () => {
            set({isRecording: false})
        },
        recycle: () => {
            const {currentNotes} = getState();

            const updatedNotes = new Map(
                Array.from(currentNotes.keys()).map((note) => [note, performance.now()])
            );

            set({ currentNotes: updatedNotes });
        }
    })));