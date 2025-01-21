"use client"

import React, {useEffect, useRef} from "react";


type Ctx = CanvasRenderingContext2D;

type GridCanvasProp = {
    width: number;
    height: number;
    rows: number;
}

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


export const GridCanvas = ({width, height, rows}: GridCanvasProp) => {

    const canvasRowsRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRowsRef.current;
        const context = canvas?.getContext('2d');

        if(!context || !canvas) return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        separateByCols(context, rows * 4, '#aaa');
        separateByCols(context, rows, '#666');

    }, [rows, width]);


    return (
        <canvas ref={canvasRowsRef} width={width} height={height} className="absolute top-0 left-0 z-10"/>
    )
};
