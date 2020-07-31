import { Size } from '@canva/editing-extensions-api-typings';
const DEVICE_DPI = window.devicePixelRatio;

export const setCanvasSize = (canvas: HTMLCanvasElement, size: Size): HTMLCanvasElement => {
  canvas.width = size.width * DEVICE_DPI;
  canvas.height = size.height * DEVICE_DPI;

  return canvas;
};

export const setPreviewStyles = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  Object.assign(canvas.style, {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'block',
    zIndex: 1,
    transform: 'scale(0.5)',
  });

  return canvas;
};

export const insertCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  document.body.appendChild(canvas);

  return canvas;
};

export const createPreviewCanvas = (size: Size): HTMLCanvasElement =>
  insertCanvas(setPreviewStyles(setCanvasSize(document.createElement('canvas'), size)));
