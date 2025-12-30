import React, { createContext, useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    const newToast = {
      id,
      message,
      type,
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after 5 seconds
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
      <div className="fixed top-4 right-4 z-50 space-y-2">
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
          background: 'rgba(230, 221, 197, 0.95)', // #e6ddc5 with opacity
          border: '2px solid #75785b',
          color: '#75785b',
        };
      case 'error':
        return {
          background: 'rgba(230, 221, 197, 0.95)', // #e6ddc5 with opacity
          border: '2px solid #e74c3c',
          color: '#e74c3c',
        };
      case 'warning':
        return {
          background: 'rgba(230, 221, 197, 0.95)', // #e6ddc5 with opacity
          border: '2px solid #f39c12',
          color: '#f39c12',
        };
      default:
        return {
          background: 'rgba(230, 221, 197, 0.95)', // #e6ddc5 with opacity
          border: '2px solid #75785b',
          color: '#75785b',
        };
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl" />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl" />;
      default:
        return <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />;
    }
  };

  return (
    <div
      className="flex items-center p-4 rounded-lg shadow-lg max-w-sm animate-fade-in-up"
      style={getToastStyle()}
    >
      <div className="mr-3 text-xl">
        {getIcon()}
      </div>
      <div className="flex-1 font-sans text-sm">
        {toast.message}
      </div>
      <button
        onClick={onClose}
        className="ml-3 p-1 rounded-full hover:opacity-70 transition-opacity"
        style={{ color: '#75785b' }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default ToastContext;