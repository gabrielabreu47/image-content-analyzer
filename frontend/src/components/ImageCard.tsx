import type { AnalyzedImage } from '../types';
import TagChip from './TagChip';
import './ImageCard.css';

interface Props {
  image: AnalyzedImage;
  onClick: () => void;
}

export default function ImageCard({ image, onClick }: Props) {
  const visibleTags = image.tags.slice(0, 4);
  const remaining = image.tags.length - visibleTags.length;

  return (
    <div className="image-card" onClick={onClick}>
      <div className="image-card__thumb">
        <img src={image.preview} alt="Analyzed" />
      </div>
      <div className="image-card__body">
        <div className="image-card__tags">
          {visibleTags.map((tag, i) => (
            <TagChip key={i} label={tag.label} confidence={tag.confidence} />
          ))}
          {remaining > 0 && (
            <span className="image-card__more">+{remaining}</span>
          )}
        </div>
        <span className="image-card__date">
          {image.analyzedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
