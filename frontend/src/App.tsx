import { useState } from 'react';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import ImageGrid from './components/ImageGrid';
import ImageDetail from './components/ImageDetail';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeImage } from './services/api';
import type { AnalyzedImage } from './types';
import './App.css';

function App() {
  const [images, setImages] = useState<AnalyzedImage[]>([]);
  const [selected, setSelected] = useState<AnalyzedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeImage(file);
      const newImage: AnalyzedImage = {
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        tags: result.tags,
        analyzedAt: new Date(),
      };
      setImages(prev => [newImage, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar onFileSelect={handleFileSelect} loading={loading} />

      <main className="app__content">
        {error && (
          <div className="app__error">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {loading && <LoadingSpinner />}

        {images.length === 0 && !loading && (
          <div className="app__empty">
            <ImageUploader onFileSelect={handleFileSelect} />
            <p className="app__empty-hint">
              Upload an image to start analyzing its content
            </p>
          </div>
        )}

        <ImageGrid images={images} onSelect={setSelected} />

        {selected && (
          <ImageDetail image={selected} onClose={() => setSelected(null)} />
        )}
      </main>
    </div>
  );
}

export default App;
