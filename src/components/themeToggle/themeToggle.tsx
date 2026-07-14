"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
        >
            Trocar tema
        </Button>
    );
}