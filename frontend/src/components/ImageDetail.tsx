import type { AnalyzedImage } from '../types';
import TagChip from './TagChip';
import './ImageDetail.css';

interface Props {
  image: AnalyzedImage;
  onClose: () => void;
}

export default function ImageDetail({ image, onClose }: Props) {
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail" onClick={e => e.stopPropagation()}>
        <button className="detail__close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="detail__image">
          <img src={image.preview} alt="Full view" />
        </div>
        <div className="detail__info">
          <h3 className="detail__heading">Tags</h3>
          <div className="detail__tags">
            {image.tags.map((tag, i) => (
              <TagChip
                key={i}
                label={tag.label}
                confidence={tag.confidence}
                showConfidence
              />
            ))}
          </div>
          <p className="detail__meta">
            Analyzed at {image.analyzedAt.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
