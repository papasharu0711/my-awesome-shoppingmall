'use client';

import { useEffect } from 'react';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

interface ColorPickerProps {
  rgb: RGB;
  cmyk: CMYK;
  onRgbChange: (rgb: RGB) => void;
  onCmykChange: (cmyk: CMYK) => void;
}

export default function ColorPicker({
  rgb,
  cmyk,
  onRgbChange,
  onCmykChange,
}: ColorPickerProps) {
  // RGB to CMYK conversion
  const rgbToCmyk = (r: number, g: number, b: number): CMYK => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  // CMYK to RGB conversion
  const cmykToRgb = (c: number, m: number, y: number, k: number): RGB => {
    const cNorm = c / 100;
    const mNorm = m / 100;
    const yNorm = y / 100;
    const kNorm = k / 100;

    const r = 255 * (1 - cNorm) * (1 - kNorm);
    const g = 255 * (1 - mNorm) * (1 - kNorm);
    const b = 255 * (1 - yNorm) * (1 - kNorm);

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
    };
  };

  const handleRgbChange = (component: keyof RGB, value: number) => {
    const newRgb = { ...rgb, [component]: value };
    onRgbChange(newRgb);
    onCmykChange(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleCmykChange = (component: keyof CMYK, value: number) => {
    const newCmyk = { ...cmyk, [component]: value };
    onCmykChange(newCmyk);
    onRgbChange(cmykToRgb(newCmyk.c, newCmyk.m, newCmyk.y, newCmyk.k));
  };

  const colorStyle = {
    backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
  };

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          미리보기
        </label>
        <div
          className="w-full h-32 rounded-lg border-2 border-gray-300"
          style={colorStyle}
        />
      </div>

      {/* RGB Sliders */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          RGB
        </label>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Red</span>
              <span className="text-sm font-medium text-gray-900">{rgb.r}</span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={rgb.r}
              onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#ef4444',
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Green</span>
              <span className="text-sm font-medium text-gray-900">{rgb.g}</span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={rgb.g}
              onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#22c55e',
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Blue</span>
              <span className="text-sm font-medium text-gray-900">{rgb.b}</span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={rgb.b}
              onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#3b82f6',
              }}
            />
          </div>
        </div>
      </div>

      {/* CMYK Sliders */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          CMYK
        </label>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Cyan</span>
              <span className="text-sm font-medium text-gray-900">{cmyk.c}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cmyk.c}
              onChange={(e) => handleCmykChange('c', parseInt(e.target.value))}
              className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#06b6d4',
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Magenta</span>
              <span className="text-sm font-medium text-gray-900">{cmyk.m}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cmyk.m}
              onChange={(e) => handleCmykChange('m', parseInt(e.target.value))}
              className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#ec4899',
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Yellow</span>
              <span className="text-sm font-medium text-gray-900">{cmyk.y}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cmyk.y}
              onChange={(e) => handleCmykChange('y', parseInt(e.target.value))}
              className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#eab308',
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Black</span>
              <span className="text-sm font-medium text-gray-900">{cmyk.k}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cmyk.k}
              onChange={(e) => handleCmykChange('k', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#000000',
              }}
            />
          </div>
        </div>
      </div>

      {/* Color Code Display */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <div className="text-xs text-gray-500 mb-1">RGB</div>
          <div className="text-sm font-mono">
            rgb({rgb.r}, {rgb.g}, {rgb.b})
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">CMYK</div>
          <div className="text-sm font-mono">
            cmyk({cmyk.c}, {cmyk.m}, {cmyk.y}, {cmyk.k})
          </div>
        </div>
      </div>
    </div>
  );
}
