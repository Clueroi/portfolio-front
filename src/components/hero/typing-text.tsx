"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
}

type TypingStatus = "typing" | "waiting" | "deleting";

export function TypingText({
    words,
    typingSpeed = 120,
    deletingSpeed = 60,
    pauseTime = 1500,
}: TypingTextProps) {
    const [status, setStatus] = useState<TypingStatus>("typing");
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");

    useEffect(() => {
        const currentWord = words[wordIndex];

        let timeout: NodeJS.Timeout;

        switch (status) {
            case "typing":
                timeout = setTimeout(() => {
                    const nextText = currentWord.slice(0, text.length + 1);

                    setText(nextText);

                    if (nextText === currentWord) {
                        setStatus("waiting");
                    }
                }, typingSpeed);

                break;

            case "waiting":
                timeout = setTimeout(() => {
                    setStatus("deleting");
                }, pauseTime);

                break;

            case "deleting":
                timeout = setTimeout(() => {
                    const nextText = currentWord.slice(0, text.length - 1);

                    setText(nextText);

                    if (nextText === "") {
                        setWordIndex((prev) => (prev + 1) % words.length);
                        setStatus("typing");
                    }
                }, deletingSpeed);

                break;
        }

        return () => clearTimeout(timeout);
    }, [
        text,
        status,
        wordIndex,
        words,
        typingSpeed,
        deletingSpeed,
        pauseTime,
    ]);

    return (
        <span className="font-mono text-3xl font-semibold text-blue-500">
            {text}
            <span className="animate-pulse">|</span>
        </span>
    );
}