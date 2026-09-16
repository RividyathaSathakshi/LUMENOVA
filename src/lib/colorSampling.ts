export interface RegionBox {
  /** All values are fractions (0-1) of the source canvas width/height. */
  x: number;
  y: number;
  width: number;
  height: number;
}

export function averageColorInRegion(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  region: RegionBox
): [number, number, number] {
  const x = Math.max(0, Math.round(region.x * canvasWidth));
  const y = Math.max(0, Math.round(region.y * canvasHeight));
  const w = Math.max(1, Math.round(region.width * canvasWidth));
  const h = Math.max(1, Math.round(region.height * canvasHeight));

  const clampedW = Math.min(w, canvasWidth - x);
  const clampedH = Math.min(h, canvasHeight - y);

  const data = ctx.getImageData(x, y, Math.max(1, clampedW), Math.max(1, clampedH)).data;

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  if (count === 0) return [255, 255, 255];
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

/** Perceived luminance, 0 (black) - 255 (white). */
export function luminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function rgbToCss([r, g, b]: [number, number, number]): string {
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Line "intensity" for an OPK band: how much darker the region is versus a
 * bright background estimate, normalized to roughly 0-1.
 */
export function lineIntensity(rgb: [number, number, number], backgroundLuminance = 235): number {
  const l = luminance(rgb);
  const raw = (backgroundLuminance - l) / backgroundLuminance;
  return Math.max(0, Math.min(1, raw));
}
