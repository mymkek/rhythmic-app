import { create } from 'zustand/index';
import { subscribeWithSelector } from 'zustand/middleware';

import metronome_hi from '@/shared/assets/audio/Perc_MetronomeQuartz_hi.wav';
import metronome_lo from '@/shared/assets/audio/Perc_MetronomeQuartz_lo.wav';

import { BASE_TEMPO, MAX_TEMPO } from '../constants/index';

const getBarTime = (tempo: number, size: number) => {
  return (60 / tempo) * size * 1000;
};

type MetronomeStoreState = {
  isStarted: boolean;
  currentBar: number;
  barStartTimestamp: number | null;
  nextTickTimestamp: number | null;
  tempo: number;
  barPattern: number[];
  audioset: {
    hi: HTMLAudioElement;
    lo: HTMLAudioElement;
  };
};

type MetronomeStoreActions = {
  toggleStarted: () => void;
  increaseBarPattern: () => void;
  decreaseBarPattern: () => void;
  setTempo: (tempo: MetronomeStoreState['tempo']) => void;
};

type MetronomeStore = MetronomeStoreState & MetronomeStoreActions;

const initialState: Omit<MetronomeStoreState, 'barPattern' | 'tempo'> = {
  isStarted: false,
  currentBar: -1,
  barStartTimestamp: null,
  nextTickTimestamp: null,
  audioset: {
    hi: new Audio(metronome_hi),
    lo: new Audio(metronome_lo),
  },
};

export const useMetronomeState = create<MetronomeStore>()(
  subscribeWithSelector((set, getState) => ({
    ...initialState,
    tempo: BASE_TEMPO,
    barPattern: [1, 0, 0, 0],

    toggleStarted: () => {
      set({ isStarted: !getState().isStarted });
    },
    increaseBarPattern: () => {
      set({ barPattern: [...getState().barPattern, 0] });
    },
    decreaseBarPattern: () => {
      const currentBarPattern = getState().barPattern;
      if (currentBarPattern.length > 1) {
        set({ barPattern: currentBarPattern.slice(0, -1) });
      }
    },
    setTempo: (tempo) => {
      let updTempo = tempo;
      if (tempo > MAX_TEMPO) {
        updTempo = MAX_TEMPO;
      }

      if (tempo < 1) {
        updTempo = 1;
      }
      set({ tempo: updTempo });
    },
  }))
);

let animationFrameId = 0;

const render = () => {
  const time = performance.now();
  const { barStartTimestamp, tempo, barPattern, nextTickTimestamp, currentBar } = useMetronomeState.getState();
  const set = useMetronomeState.setState;
  const barTime = getBarTime(tempo, barPattern.length);

  if (!barStartTimestamp) {
    set({ barStartTimestamp: time, nextTickTimestamp: time });
  } else if (time > barStartTimestamp + barTime) {
    set({ barStartTimestamp: barStartTimestamp + barTime });
  }

  if (nextTickTimestamp && time >= nextTickTimestamp) {
    set({
      nextTickTimestamp: nextTickTimestamp + barTime / barPattern.length,
      currentBar: currentBar >= barPattern.length - 1 || currentBar === -1 ? 0 : currentBar + 1,
    });
  }

  animationFrameId = window.requestAnimationFrame(render);
};

const resetState = () => {
  useMetronomeState.setState(initialState);
  window.cancelAnimationFrame(animationFrameId);
};

const toggleStart = (isStarted: boolean) => {
  if (isStarted) {
    render();
  } else {
    resetState();
  }
};

useMetronomeState.subscribe((state) => state.isStarted, toggleStart);
useMetronomeState.subscribe(
  (state) => ({ currentBar: state.currentBar, audioset: state.audioset }),
  ({ currentBar, audioset }) => {
    if (currentBar !== -1) {
      const currentSound = currentBar === 0 ? audioset.hi : audioset.lo;
      currentSound.play();
    }
  }
);
useMetronomeState.subscribe(
  (state) => state.barPattern,
  () => {
    const { isStarted, toggleStarted } = useMetronomeState.getState();

    if (isStarted) {
      resetState();
      toggleStarted();
    }
  }
);
