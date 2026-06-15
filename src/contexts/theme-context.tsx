import React, { createContext, useContext, useState, type ReactNode } from "react";

interface ThemeData {
    isDarkMode: boolean,
    setIsDarkMode: any
}

interface ThemeProps {
    children: ReactNode
}

const Theme = createContext<ThemeData | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(Theme)
    if (!context) {
        throw new Error('useFormState deve ser usado dentro de um FormStateProvider')
    }
    return context
}

export const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
        <Theme.Provider value={{ setIsDarkMode, isDarkMode }}>
            {children}
        </Theme.Provider>
    )
}
