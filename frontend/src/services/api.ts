import type { AnalysisResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function analyzeImage(file: File): Promise<AnalysisResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  return response.json();
}
