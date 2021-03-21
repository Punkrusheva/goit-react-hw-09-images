import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
      window.addEventListener('keydown', handleKeyDown);
      
    return () => { window.removeEventListener('keydown', handleKeyDown); }
    }, [onClose]
  );
  
  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
    
  return createPortal(
        <div className={styles.overlay} onClick={handleBackdropClick}>
          <div className={styles.content}>{children}</div>
      </div>,
      modalRoot
   );
};