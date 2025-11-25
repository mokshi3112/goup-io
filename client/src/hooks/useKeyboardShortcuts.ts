import React, { useEffect } from 'react';

interface KeyboardShortcutsProps {
    onNewTask: () => void;
    onSearch: () => void;
}

export const useKeyboardShortcuts = ({ onNewTask, onSearch }: KeyboardShortcutsProps) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ctrl/Cmd + N: New Task
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                onNewTask();
            }
            // Ctrl/Cmd + K: Search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                onSearch();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onNewTask, onSearch]);
};
