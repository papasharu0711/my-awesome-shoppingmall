'use client';

import { FolderData } from '@/app/page';
import { Folder, Trash2 } from 'lucide-react';

interface FolderListProps {
  folders: FolderData[];
  selectedFolder: string | null;
  onSelectFolder: (id: string) => void;
  onDeleteFolder: (id: string) => void;
}

export default function FolderList({
  folders,
  selectedFolder,
  onSelectFolder,
  onDeleteFolder,
}: FolderListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">폴더</h2>
      </div>
      <div className="p-2">
        {folders.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            폴더가 없습니다
          </div>
        ) : (
          <div className="space-y-1">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={`group relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                  selectedFolder === folder.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
                onClick={() => onSelectFolder(folder.id)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Folder className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{folder.name}</p>
                    <p className="text-xs text-gray-500">
                      {folder.colors.length}개
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`"${folder.name}" 폴더를 삭제하시겠습니까?`)) {
                      onDeleteFolder(folder.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
