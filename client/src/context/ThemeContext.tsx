import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'space' | 'nebula' | 'galaxy';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('space');

    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) setTheme(saved);
    }, []);

    const toggleTheme = () => {
        const themes: Theme[] = ['space', 'nebula', 'galaxy'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        document.body.className = `theme-${nextTheme}`;
    };

    useEffect(() => {
        document.body.className = `theme-${theme}`;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
