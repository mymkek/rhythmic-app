"use client"

import React, {useEffect, useRef, useState} from "react";


import {useMetronomeState} from "@/features/metronome/model";
import {useMidiMessageStore} from "@/shared/lib/midi-provider";

type Ctx = CanvasRenderingContext2D;

const separateByCols = (ctx: Ctx, cols: number, color: string) => {
    const stepCols = ctx.canvas.width / cols;

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.setLineDash([5, 5]);

    for (let i = 1; i < cols; i++) {
        const x = i * stepCols;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
    }

    ctx.stroke();
}


export const BarCanvas = () => {

    const {tempo, isStarted, timeSignature, barStartTimestamp} = useMetronomeState();
    const {currentNotes} = useMidiMessageStore();


    const canvasRowsRef = useRef<HTMLCanvasElement>(null);
    const canvasNotesRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const canvas = canvasRowsRef.current;
        setWidth(canvas?.parentElement?.scrollWidth || 10)
    }, []);

    useEffect(() => {
        const canvas = canvasRowsRef.current;
        const context = canvas?.getContext('2d');

        if(!context || !canvas) return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        separateByCols(context, timeSignature * 4, '#aaa');
        separateByCols(context, timeSignature, '#666');

    }, [timeSignature, width]);

    useEffect(() => {
        const canvas = canvasNotesRef.current;
        const context = canvas?.getContext('2d');

        console.log(barStartTimestamp)
        if(!context || !canvas || !isStarted || !barStartTimestamp) return;

        let animationFrameId = -1;
        const barTimeMs = timeSignature * (60000 / tempo);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        const render = () => {
            const currentTime = Date.now();



            const barFullness = (currentTime - barStartTimestamp) / barTimeMs;
            context.fillStyle = "#7584d7";


            currentNotes.values().forEach((note) => {
                context.fillRect(Math.round(canvas.width * barFullness), canvas.height - ((canvas.height / 144) * note), 1, canvas.height / 144)
            })

            animationFrameId = window.requestAnimationFrame(render)
        }
        render()


        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [timeSignature, isStarted, currentNotes, barStartTimestamp]);

    return (
        <div className="bg-amber-50 relative" style={{height: 300}}>
            <canvas ref={canvasRowsRef} width={width} height={300} className="absolute top-0 left-0 z-10"/>
            <canvas ref={canvasNotesRef} width={width} height={300} className="absolute top-0 left-0 z-20"/>
        </div>
    )
};
