

export type MetronomeBar = {
    id: number;
    type: 'skipped' | 'upbeat' | 'downbeat';
}


export interface MetronomeState {
    isStarted: boolean
    tempo: number
    timeSignature: number
    state: MetronomeBar[]
    setTempo: (tempo: number) => void
    setTimeSignature: (timeSignature: number) => void
    resetState: () => void
    currentBarIndex: number
    updateBarIndex: () => void
    toggleStart: () => void
    setBarState: (barId: MetronomeBar["id"], stateUpdate: { type: MetronomeBar["type"] }) => void
}