import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
