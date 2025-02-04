"use client"

import {useEffect} from "react";




export default function RecognizeNotes() {


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(console.log)
            .catch(console.error);
    }, []);

    return (
        <div className="container mx-auto">
            RecognizeNotes
        </div>
    );
}
