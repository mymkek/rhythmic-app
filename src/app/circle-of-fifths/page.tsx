import React from "react";

export default function CircleOfFifths() {

    function polarToCartesian(
        x: number,
        y: number,
        r: number,
        degrees: number
    ): [number, number] {
        const radians = (degrees * Math.PI) / 180.0;
        return [x + r * Math.cos(radians), y + r * Math.sin(radians)];
    }

    function segmentPath(
        x: number,
        y: number,
        r0: number,
        r1: number,
        d0: number,
        d1: number
    ): string {
        const arc = Math.abs(d0 - d1) > 180 ? 1 : 0;

        const point = (radius: number, degree: number): string =>
            polarToCartesian(x, y, radius, degree)
                .map((n) => n.toPrecision(5))
                .join(',');

        return [
            `M${point(r0, d0)}`,
            `A${r0},${r0},0,${arc},1,${point(r0, d1)}`,
            `L${point(r1, d1)}`,
            `A${r1},${r1},0,${arc},0,${point(r1, d0)}`,
            'Z',
        ].join('');
    }


    function segment(index: number, segments: number, size: number, radius: number, width: number): string {
        const center = size / 2;
        const degrees = 360 / segments;
        const start = degrees * index;
        const end = degrees * (index + 1) + 1;

        return segmentPath(
            center,
            center,
            radius,
            radius - width,
            start,
            end
        );
    }

    function posXY(center: number, radius: number, angle: number) {
        return [
            center + radius * Math.cos(angle * Math.PI / 180.0),
            center + radius * Math.sin(angle * Math.PI / 180.0)
        ]
    }

    return (
        <div className="container mx-auto">
            <div className="overflow-hidden">
                <svg viewBox="0 0 300 300" className="aspect-square origin-center -rotate--15"
                     xmlns="http://www.w3.org/2000/svg">
                    {new Array(12).fill(0).map((_, i, array) => {
                        const size = 300; /* diameter / viewBox */
                        const radius = size/2;
                        const angle = i * (360 / array.length);
                        const [x1, y1] = posXY(radius, 85, angle);
                        const [x2, y2] = posXY(radius, 55, angle);
                        return (
                            <React.Fragment key={i}>
                                <path d={segment(i, 12, 300, 150, 50)}
                                      className="fill-black stroke-accent-500"/>
                                <path d={segment(i, 12, 300, 100, 30)}
                                      className="fill-black stroke-accent-800"/>

                                <text x={x1} y={y1+3} className="fill-black stroke-accent-500">A</text>
                                <text x={x2} y={y2+2} className="fill-black stroke-accent-500">Em</text>
                            </React.Fragment>
                        )
                    })}

                </svg>
            </div>
        </div>
    );
}
