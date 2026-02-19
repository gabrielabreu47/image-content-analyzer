import { useRef } from 'react';
import './Navbar.css';

interface Props {
  onFileSelect: (file: File) => void;
  loading: boolean;
}

export default function Navbar({ onFileSelect, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      e.target.value = '';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <svg className="navbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="navbar__title">Image Analyzer</span>
        </div>
        <button
          className="navbar__upload-btn"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : '+ Upload Image'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleChange}
          hidden
        />
      </div>
    </nav>
  );
}
