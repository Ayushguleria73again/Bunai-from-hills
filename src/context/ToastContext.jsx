import React, { createContext, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };

    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 2000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* ✅ Responsive container */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-2 w-full px-3 sm:px-0 flex flex-col items-center">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const getToastStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          background: 'rgba(230, 221, 197, 0.95)',
          border: '2px solid #75785b',
          color: '#75785b',
        };
      case 'error':
        return {
          background: 'rgba(230, 221, 197, 0.95)',
          border: '2px solid #e74c3c',
          color: '#e74c3c',
        };
      case 'warning':
        return {
          background: 'rgba(230, 221, 197, 0.95)',
          border: '2px solid #f39c12',
          color: '#f39c12',
        };
      default:
        return {
          background: 'rgba(230, 221, 197, 0.95)',
          border: '2px solid #75785b',
          color: '#75785b',
        };
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} />;
      case 'error':
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      default:
        return <FontAwesomeIcon icon={faInfoCircle} />;
    }
  };

  return (
    <div
      className="
        flex items-start sm:items-center
        gap-3
        p-3 sm:p-4
        rounded-lg shadow-lg
        w-full sm:max-w-sm
        text-sm
        animate-fade-in-up
      "
      style={getToastStyle()}
    >
      <div className="text-lg sm:text-xl mt-0.5 sm:mt-0">
        {getIcon()}
      </div>

      <div className="flex-1 break-words leading-relaxed">
        {toast.message}
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-full hover:opacity-70 transition-opacity"
        style={{ color: '#75785b' }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default ToastContext;
