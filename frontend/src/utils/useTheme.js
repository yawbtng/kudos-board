// src/hooks/useTheme.js
import { useState, useLayoutEffect } from 'react';

export default function useTheme() {
    const [dark, setDark] = useState(() =>
        localStorage.getItem('theme') === 'dark'
    );

  // apply/remove class synchronously so no flash
    useLayoutEffect(() => {
        document.body.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    return [dark, () => setDark((d) => !d)];
}
