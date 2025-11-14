'use client';

import { useState } from 'react';
import { ColorItem } from '@/app/page';
import { Edit2, Trash2, X, Check, Download } from 'lucide-react';

interface ColorCardProps {
  color: ColorItem;
  onDelete: () => void;
  onUpdate: (updates: Partial<ColorItem>) => void;
}

export default function ColorCard({ color, onDelete, onUpdate }: ColorCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(color.name);
  const [editDescription, setEditDescription] = useState(color.description || '');

  const handleSave = () => {
    onUpdate({ name: editName, description: editDescription });
    setIsEditing(false);
  };

  const handleDownload = () => {
    if (color.type === 'image' && color.imageUrl) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = color.imageUrl;
      link.download = `${color.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (color.type === 'solid' && color.rgb) {
      // Create a canvas with the solid color
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${color.name}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        });
      }
    }
  };

  const getColorStyle = () => {
    if (color.type === 'image' && color.imageUrl) {
      return {
        backgroundImage: `url(${color.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (color.rgb) {
      return {
        backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
      };
    }
    return { backgroundColor: '#cccccc' };
  };

  const formatColorInfo = () => {
    if (color.type === 'solid') {
      const parts = [];
      if (color.rgb) {
        parts.push(`RGB(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`);
      }
      if (color.cmyk) {
        parts.push(`CMYK(${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k})`);
      }
      return parts.join(' / ');
    }
    return '이미지';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      {/* Color Preview */}
      <div className="relative h-48" style={getColorStyle()}>
        <div className="absolute top-2 right-2 flex gap-2">
          {!isEditing && (
            <>
              <button
                onClick={handleDownload}
                className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition"
                title="다운로드"
              >
                <Download className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition"
                title="편집"
              >
                <Edit2 className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => {
                  if (confirm('이 컬러를 삭제하시겠습니까?')) {
                    onDelete();
                  }
                }}
                className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition"
                title="삭제"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Color Info */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="컬러명"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="설명 (선택사항)"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition"
              >
                <Check className="w-4 h-4" />
                저장
              </button>
              <button
                onClick={() => {
                  setEditName(color.name);
                  setEditDescription(color.description || '');
                  setIsEditing(false);
                }}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2 transition"
              >
                <X className="w-4 h-4" />
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-gray-900 mb-1">{color.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{formatColorInfo()}</p>
            {color.description && (
              <p className="text-sm text-gray-600 mt-2">{color.description}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
