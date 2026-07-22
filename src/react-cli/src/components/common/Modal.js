import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, onYes, onNo, title, message }) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-lg mx-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h5 className="text-lg font-semibold">{title}</h5>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
              aria-label="Close"
            ><X size={20} /></button>
          </div>

          <div className="p-4">
            <p>{message}</p>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
              onClick={onNo}
            >
              {t('common.no')}
            </button>
            <button
              type="button"
              className="bg-primary-700 hover:bg-secondary-700 text-white font-bold py-1 px-3 rounded"
              onClick={onYes}
            >
              {t('common.yes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}