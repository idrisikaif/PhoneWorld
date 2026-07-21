// ====================================================
// TOAST NOTIFICATION CONTEXT (frontend/src/context/ToastContext.js)
// ====================================================
// This context provides global floating toast notifications to any page or component.

import React, { createContext, useState } from 'react';
import '../styles/css.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  /**
   * Show a toast message
   * @param {string} message - Text to display
   * @param {string} type - 'success' | 'danger' | 'info' | 'warning'
   */
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div 
          className={`toast-notification alert-${toast.type} shadow-lg`}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '14px 22px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <i className={`fa-solid ${
            toast.type === 'success' ? 'fa-circle-check text-success' :
            toast.type === 'danger' ? 'fa-circle-xmark text-danger' :
            toast.type === 'warning' ? 'fa-triangle-exclamation text-warning' : 'fa-circle-info text-info'
          }`}></i>
          <span className="fw-semibold text-dark">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
