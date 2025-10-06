import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './layout/Background';
import MainLayout from './layout/MainLayout';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Background />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
