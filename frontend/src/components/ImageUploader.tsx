import { useRef, useState } from 'react';
import './ImageUploader.css';

interface Props {
  onFileSelect: (file: File) => void;
}

export default function ImageUploader({ onFileSelect }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      e.target.value = '';
    }
  };

  return (
    <div
      className={`uploader ${isDragging ? 'uploader--active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <svg className="uploader__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 16V8m0 0l-3 3m3-3l3 3" />
        <path d="M3 16.5V18a3 3 0 003 3h12a3 3 0 003-3v-1.5" />
      </svg>
      <p className="uploader__text">
        Drop an image here or <span className="uploader__link">browse</span>
      </p>
      <p className="uploader__hint">JPEG, PNG, GIF, WebP up to 10MB</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleChange}
        hidden
      />
    </div>
  );
}
