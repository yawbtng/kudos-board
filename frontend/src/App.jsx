import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import ThemeToggle from './components/ThemeToggle';
import './css/theme.css';

export default function App() {
  return (
    <>

    <ThemeToggle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
}
