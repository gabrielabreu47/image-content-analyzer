export interface Tag {
  label: string;
  confidence: number;
}

export interface AnalysisResponse {
  tags: Tag[];
}

export interface AnalyzedImage {
  id: string;
  file: File;
  preview: string;
  tags: Tag[];
  analyzedAt: Date;
}
