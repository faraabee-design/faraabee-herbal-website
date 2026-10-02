import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#AFC7A5]/30">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-full shrink-0 ${
              isDestructive ? 'bg-red-50 text-red-600' : 'bg-[#E3EBDD] text-[#183F32]'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-[#183F32]">{title}</h3>
            <p className="mt-2 text-sm text-[#26312B]/80 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[#26312B] bg-[#FAF9F3] hover:bg-[#E3EBDD]/40 rounded-xl transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors cursor-pointer ${
              isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#183F32] hover:bg-[#122F25]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
