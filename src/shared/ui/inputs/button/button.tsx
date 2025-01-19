import React from "react";

type ButtonSize = "small" ;

export type ButtonProps = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    size?: ButtonSize;
}

export const Button = ({children, disabled, onClick, size = "small"}: ButtonProps) => {

    const sizeClasses: Record<ButtonSize, string> = {
        small: "px-3 py-2 text-xs"
    }
    useMetronomeState()
    const classes = [
        sizeClasses[size],
        "font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    ];


    return (
        <button disabled={disabled} onClick={onClick} className={classes.join(" ")}>
            {children}
        </button>
    );
};