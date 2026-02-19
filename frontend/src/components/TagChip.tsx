import './TagChip.css';

interface Props {
  label: string;
  confidence: number;
  showConfidence?: boolean;
}

export default function TagChip({ label, confidence, showConfidence = false }: Props) {
  return (
    <span className="tag-chip">
      {label}
      {showConfidence && (
        <span className="tag-chip__confidence">
          {Math.round(confidence * 100)}%
        </span>
      )}
    </span>
  );
}
