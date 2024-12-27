export interface ImageConfig {
  width?: number;
  height?: number;
  format: 'png' | 'jpeg' | 'webp';
  quality: number;
  scale: number;
  background: string;
}

export interface Template {
  id: string;
  name: string;
  code: string;
  category: string;
}
