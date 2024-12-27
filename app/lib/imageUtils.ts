import { toPng, toJpeg } from 'html-to-image';
import { ImageConfig } from '../types';

export const convertToImage = async (element: HTMLElement, config: ImageConfig) => {
  const options = {
    quality: config.quality,
    pixelRatio: config.scale,
    skipAutoScale: true,
    cacheBust: true,
    width: config.width,
    height: config.height,
    backgroundColor: config.background
  };

  switch (config.format) {
    case 'jpeg':
      return await toJpeg(element, options);
    case 'webp':
      return await toPng(element, { ...options, style: { background: config.background || '#ffffff' } });
    default:
      return await toPng(element, options);
  }
};
