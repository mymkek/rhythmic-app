import {MetronomeBar} from "@/features/metronome/model/types";

export const getDefaultMetronomeState = (timeSignature: number): MetronomeBar[] => {
    return new Array(timeSignature).fill(null)
        .map((value, index) => ({id: index, type: 'downbeat'}))
}