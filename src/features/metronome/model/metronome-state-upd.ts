
import {create} from "zustand/index";
import {subscribeWithSelector} from 'zustand/middleware'

import {AudioPlayer} from "@/shared/lib/audio-player";

import {BASE_TEMPO} from "../constants/index";


const getBarTime = (tempo: number, size: number) => {
    return (60 / tempo) * size * 1000
}


type MetronomeStoreState = {
    isStarted: boolean
    currentBar: number
    barStartTimestamp: number | null
    nextTickTimestamp: number | null
    tempo: number
    barPattern: number[]
}

type MetronomeStoreActions = {
    toggleStarted: () => void
    increaseBarPattern: () => void
    decreaseBarPattern: () => void
    setTempo: (tempo: MetronomeStoreState["tempo"]) => void
}

type MetronomeStore = MetronomeStoreState & MetronomeStoreActions

const initialState: Omit<MetronomeStoreState, "barPattern"> = {
    isStarted: false,
    currentBar: -1,
    tempo: BASE_TEMPO,
    barStartTimestamp: null,
    nextTickTimestamp: null,
}

export const useMetronomeState = create<MetronomeStore>()(
    subscribeWithSelector((set, getState) => ({
        ...initialState,
        barPattern: [1, 0, 0, 0],
        toggleStarted: () => {
            set({isStarted: !getState().isStarted});
        },
        increaseBarPattern: () => {
            set({barPattern: [...getState().barPattern, 0]});
        },
        decreaseBarPattern: () => {
            const currentBarPattern = getState().barPattern;
            if(currentBarPattern.length > 1) {
                set({barPattern: currentBarPattern.slice(0, -1)});
            }
        },
        setTempo: (tempo) => {
            set({tempo: tempo});
        }
    })),
);

let animationFrameId = 0;

const render = () => {
    const time = performance.now();
    const {barStartTimestamp, tempo, barPattern, nextTickTimestamp, currentBar} = useMetronomeState.getState();
    const set = useMetronomeState.setState;
    const barTime = getBarTime(tempo, barPattern.length);

    if (!barStartTimestamp) {
        set({barStartTimestamp: time, nextTickTimestamp: time})
    } else if (time > barStartTimestamp + barTime) {
        set({barStartTimestamp: barStartTimestamp + barTime})
    }

    if (nextTickTimestamp && time >= nextTickTimestamp) {
        set({
            nextTickTimestamp: nextTickTimestamp + barTime / barPattern.length,
            currentBar: currentBar >= barPattern.length - 1 || currentBar === -1 ? 0 : currentBar + 1
        })
    }

    animationFrameId = window.requestAnimationFrame(render)
}

const resetState = () => {
    useMetronomeState.setState(initialState);
    window.cancelAnimationFrame(animationFrameId);
}

const toggleStart = (isStarted: boolean) => {
    if (isStarted) {
        render();
    } else {
        resetState();
    }
};

useMetronomeState.subscribe((state) => state.isStarted, toggleStart);
useMetronomeState.subscribe((state) => state.currentBar, (currentBar) => {
    if(currentBar !== -1) {
        AudioPlayer.playSound('metronome_1')
    }
});
useMetronomeState.subscribe((state) => state.barPattern, () => {
    const {isStarted, toggleStarted} = useMetronomeState.getState();

    if(isStarted) {
        resetState();
        toggleStarted();
    }
});