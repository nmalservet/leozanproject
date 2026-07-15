import React from 'react';
import { useTranslation } from 'react-i18next';

export function Modal({ isOpen, onClose, onYes, onNo, title, message }) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
     <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            <p>{message}</p>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onNo}
            >
              {t('common.no')}
            </button>
            <button
              type="button"
              className="btn btn-primary"
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