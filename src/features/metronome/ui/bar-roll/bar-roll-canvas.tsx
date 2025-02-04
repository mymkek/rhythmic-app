"use client"

import React, {useEffect, useRef} from "react";

import {useMetronomeState} from "@/features/metronome/model";
import {useMidiRecorderStore} from "@/shared/lib/midi-provider";


type BarCanvasProps = {
    width: number;
    height: number;
}

export const BarCanvas = ({height, width}: BarCanvasProps) => {

    const {tempo, isStarted, barPattern, barStartTimestamp} = useMetronomeState();
    const {recycle} = useMidiRecorderStore();
    const timeSignature = barPattern.length;

    const canvasNotesRef = useRef<HTMLCanvasElement>(null);

    let animationFrameId = -1;

    const unsubscribeStore = useMidiRecorderStore.subscribe(state => state.currentNotes, (notes: Map<number, number>) => {
        window.cancelAnimationFrame(animationFrameId);
        const barTimeMs = timeSignature * (60000 / tempo);
        const context = canvasNotesRef.current?.getContext('2d');

        function step() {
            if (notes.size && context && barStartTimestamp) {
                console.log(notes)
                const currentTime = performance.now();
                const barFullnessNow = (currentTime - barStartTimestamp) / barTimeMs;

                notes.entries().forEach(([note, startTime]) => {
                    context.beginPath();
                    const barFullnessStartNote = (startTime - barStartTimestamp) / barTimeMs;
                    const startPos = Math.round(context.canvas.width * barFullnessStartNote);
                    const endPos = Math.round(context.canvas.width * barFullnessNow);
                    const width = endPos - startPos;
                    const height = context.canvas.height / 144;
                    const yPos = Math.round(height * note);

                    context.rect(startPos, yPos, width, height);
                    context.fill();
                })
                animationFrameId = window.requestAnimationFrame(step);
            }
        }

        animationFrameId = window.requestAnimationFrame(step);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    })

    useEffect(() => {
        const context = canvasNotesRef.current?.getContext('2d');

        if (!context || !isStarted) return;

        const barTimeMs = timeSignature * (60000 / tempo);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = "#7584d7";
        recycle();



        return () => {
            window.cancelAnimationFrame(animationFrameId)
            unsubscribeStore()
        }
    }, [timeSignature, isStarted, barStartTimestamp]);

    return (
        <canvas ref={canvasNotesRef} width={width} height={height} className="absolute top-0 left-0 z-20"/>
    )
};
