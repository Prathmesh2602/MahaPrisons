import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './hooks/useAccessibility';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import YerawadaOpenJailPage from './pages/YerawadaOpenJailPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="yerawada-open-jail" element={<YerawadaOpenJailPage />} />
            <Route path="gallery" element={<GalleryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

export default App;
