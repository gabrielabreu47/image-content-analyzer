import type { AnalyzedImage } from '../types';
import ImageCard from './ImageCard';
import './ImageGrid.css';

interface Props {
  images: AnalyzedImage[];
  onSelect: (image: AnalyzedImage) => void;
}

export default function ImageGrid({ images, onSelect }: Props) {
  if (images.length === 0) return null;

  return (
    <section className="image-grid">
      <h2 className="image-grid__title">Analyzed Images</h2>
      <div className="image-grid__list">
        {images.map(image => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => onSelect(image)}
          />
        ))}
      </div>
    </section>
  );
}
