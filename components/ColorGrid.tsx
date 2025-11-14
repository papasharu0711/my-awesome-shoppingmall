'use client';

import { ColorItem } from '@/app/page';
import ColorCard from './ColorCard';

interface ColorGridProps {
  colors: ColorItem[];
  onDeleteColor: (id: string) => void;
  onUpdateColor: (id: string, updates: Partial<ColorItem>) => void;
}

export default function ColorGrid({
  colors,
  onDeleteColor,
  onUpdateColor,
}: ColorGridProps) {
  if (colors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500">
          컬러가 없습니다. "컬러 추가" 버튼을 눌러 시작하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {colors.map((color) => (
        <ColorCard
          key={color.id}
          color={color}
          onDelete={() => onDeleteColor(color.id)}
          onUpdate={(updates) => onUpdateColor(color.id, updates)}
        />
      ))}
    </div>
  );
}
