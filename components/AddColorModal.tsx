'use client';

import { useState, useRef } from 'react';
import { X, Upload, Palette } from 'lucide-react';
import { ColorItem } from '@/app/page';
import ColorPicker from './ColorPicker';

interface AddColorModalProps {
  onClose: () => void;
  onAdd: (color: Omit<ColorItem, 'id' | 'createdAt'>) => void;
}

type ColorMode = 'image' | 'solid';

export default function AddColorModal({ onClose, onAdd }: AddColorModalProps) {
  const [mode, setMode] = useState<ColorMode>('image');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rgb, setRgb] = useState({ r: 128, g: 128, b: 128 });
  const [cmyk, setCmyk] = useState({ c: 0, m: 0, y: 0, k: 50 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImageUrl(e.target?.result as string);
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (mode === 'image') {
      if (!imageUrl) return;
      onAdd({
        name: name.trim(),
        type: 'image',
        imageUrl,
        description: description.trim() || undefined,
      });
    } else {
      onAdd({
        name: name.trim(),
        type: 'solid',
        rgb,
        cmyk,
        description: description.trim() || undefined,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">컬러 추가</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              컬러 타입
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('image')}
                className={`p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                  mode === 'image'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Upload className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">이미지</div>
                  <div className="text-xs text-gray-500">사진 업로드/붙여넣기</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setMode('solid')}
                className={`p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                  mode === 'solid'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Palette className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">단색</div>
                  <div className="text-xs text-gray-500">RGB/CMYK 설정</div>
                </div>
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              컬러명 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: 오크 내추럴, 화이트, 블랙 매트 등"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="컬러에 대한 추가 정보 (선택사항)"
              rows={3}
            />
          </div>

          {/* Mode-specific inputs */}
          {mode === 'image' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이미지 *
              </label>
              <div
                onPaste={handlePaste}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {imageUrl ? (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageUrl('');
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      클릭하여 파일 선택 또는 이미지 붙여넣기 (Ctrl+V)
                    </p>
                    <p className="text-sm text-gray-500">
                      JPG, PNG, GIF 등 지원
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <ColorPicker
              rgb={rgb}
              cmyk={cmyk}
              onRgbChange={setRgb}
              onCmykChange={setCmyk}
            />
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!name.trim() || (mode === 'image' && !imageUrl)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
