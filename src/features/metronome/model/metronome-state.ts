import {create} from "zustand/index";

import {getDefaultMetronomeState} from "@/features/metronome/lib";
import {MetronomeState} from "@/features/metronome/model/types";

import {BASE_TEMPO, BASE_TIME_SIGNATURE} from "../constants/index";


export const useMetronomeState = create<MetronomeState>((set) => ({
    isStarted: false,
    tempo: BASE_TEMPO,
    timeSignature: BASE_TIME_SIGNATURE,
    state: [],
    currentBarIndex: 0,
    setTempo: (tempo) => set({tempo}),
    setTimeSignature: (timeSignature) => {
        const newState = getDefaultMetronomeState(timeSignature)
        set({timeSignature, state: newState})
    },
    resetState: () => set((state) => {
        return {state: getDefaultMetronomeState(state.timeSignature)}
    }),
    updateBarIndex: () => set((state) => {
        if (state.currentBarIndex === state.timeSignature - 1) {
            return {currentBarIndex: 0};
        }
        return {currentBarIndex: state.currentBarIndex + 1};
    }),
    setBarState: (barId, stateUpdate) =>
        set((state) => ({
            state: state.state.map((item) =>
                item.id === barId ? {...item, ...stateUpdate} : item
            ),
        })),
    toggleStart: () => set((state) => ({isStarted: !state.isStarted}))

}))
