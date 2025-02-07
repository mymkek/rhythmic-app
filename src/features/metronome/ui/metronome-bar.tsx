import React from "react";


type MetronomeBarProps = { isActive: boolean };

export const MetronomeBarComponent = ({
                                          isActive
                                      }: MetronomeBarProps) => {

    // const bgColorsMap: Record<MetronomeBarProps["type"], string> = {
    //     "upbeat": "bg-amber-500 hover:bg-amber-400",
    //     "downbeat": "bg-rose-500 hover:bg-rose-400",
    //     "skipped": "bg-slate-700 hover:bg-slate-600",
    // }

    const classes = [
        "rounded-full",
        isActive ? "bg-amber-500 hover:bg-amber-400" : null,
        "w-4",
        "h-4",
        "cursor-pointer",
        "border"
    ]

    return (
        <div className={classes.join(" ")}>

        </div>
    )
};