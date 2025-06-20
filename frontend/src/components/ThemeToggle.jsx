// src/components/ThemeToggle.jsx
import useTheme from '../utils/useTheme.js';
import '../css//theme-toggle.css';

export default function ThemeToggle() {
  const [dark, toggle] = useTheme();

  return (
    <button className="theme-toggle" onClick={toggle} title="Toggle theme">
      {dark ? '🌙' : '☀️'}
    </button>
  );
}