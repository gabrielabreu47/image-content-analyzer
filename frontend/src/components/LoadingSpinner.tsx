import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p className="spinner__text">Analyzing image...</p>
    </div>
  );
}
