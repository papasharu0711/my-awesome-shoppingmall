'use client';

import { useState, useEffect } from 'react';
import FolderList from '@/components/FolderList';
import ColorGrid from '@/components/ColorGrid';
import AddColorModal from '@/components/AddColorModal';
import AddFolderModal from '@/components/AddFolderModal';
import { Folder, Plus } from 'lucide-react';

export interface ColorItem {
  id: string;
  name: string;
  type: 'image' | 'solid';
  imageUrl?: string;
  rgb?: { r: number; g: number; b: number };
  cmyk?: { c: number; m: number; y: number; k: number };
  description?: string;
  createdAt: string;
}

export interface FolderData {
  id: string;
  name: string;
  colors: ColorItem[];
  createdAt: string;
}

export default function Home() {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('colorPaletteData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFolders(parsed);
      if (parsed.length > 0 && !selectedFolder) {
        setSelectedFolder(parsed[0].id);
      }
    }
  }, []);

  // Save data to localStorage whenever folders change
  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem('colorPaletteData', JSON.stringify(folders));
    }
  }, [folders]);

  const addFolder = (name: string) => {
    const newFolder: FolderData = {
      id: Date.now().toString(),
      name,
      colors: [],
      createdAt: new Date().toISOString(),
    };
    setFolders([...folders, newFolder]);
    setSelectedFolder(newFolder.id);
  };

  const deleteFolder = (id: string) => {
    const newFolders = folders.filter(f => f.id !== id);
    setFolders(newFolders);
    if (selectedFolder === id) {
      setSelectedFolder(newFolders.length > 0 ? newFolders[0].id : null);
    }
  };

  const addColor = (color: Omit<ColorItem, 'id' | 'createdAt'>) => {
    if (!selectedFolder) return;

    const newColor: ColorItem = {
      ...color,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setFolders(folders.map(folder => 
      folder.id === selectedFolder
        ? { ...folder, colors: [...folder.colors, newColor] }
        : folder
    ));
  };

  const deleteColor = (colorId: string) => {
    if (!selectedFolder) return;

    setFolders(folders.map(folder =>
      folder.id === selectedFolder
        ? { ...folder, colors: folder.colors.filter(c => c.id !== colorId) }
        : folder
    ));
  };

  const updateColor = (colorId: string, updates: Partial<ColorItem>) => {
    if (!selectedFolder) return;

    setFolders(folders.map(folder =>
      folder.id === selectedFolder
        ? {
            ...folder,
            colors: folder.colors.map(c =>
              c.id === colorId ? { ...c, ...updates } : c
            ),
          }
        : folder
    ));
  };

  const currentFolder = folders.find(f => f.id === selectedFolder);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Folder className="w-7 h-7" />
              Color Palette Library
            </h1>
            <button
              onClick={() => setIsAddFolderModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
            >
              <Plus className="w-5 h-5" />
              새 폴더
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Folder List */}
          <div className="col-span-3">
            <FolderList
              folders={folders}
              selectedFolder={selectedFolder}
              onSelectFolder={setSelectedFolder}
              onDeleteFolder={deleteFolder}
            />
          </div>

          {/* Main Content - Color Grid */}
          <div className="col-span-9">
            {currentFolder ? (
              <>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {currentFolder.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {currentFolder.colors.length}개의 컬러
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddColorModalOpen(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition"
                    >
                      <Plus className="w-5 h-5" />
                      컬러 추가
                    </button>
                  </div>
                </div>

                <ColorGrid
                  colors={currentFolder.colors}
                  onDeleteColor={deleteColor}
                  onUpdateColor={updateColor}
                />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Folder className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  폴더를 선택하거나 생성하세요
                </h3>
                <p className="text-gray-500 mb-6">
                  왼쪽 사이드바에서 폴더를 선택하거나 새 폴더를 만들어 시작하세요
                </p>
                <button
                  onClick={() => setIsAddFolderModalOpen(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 transition"
                >
                  <Plus className="w-5 h-5" />
                  첫 폴더 만들기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isAddColorModalOpen && (
        <AddColorModal
          onClose={() => setIsAddColorModalOpen(false)}
          onAdd={addColor}
        />
      )}

      {isAddFolderModalOpen && (
        <AddFolderModal
          onClose={() => setIsAddFolderModalOpen(false)}
          onAdd={addFolder}
        />
      )}
    </div>
  );
}
