import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    style: 'bg-green-500 text-white',
  },
  error: {
    icon: <XCircle className="h-5 w-5" />,
    style: 'bg-red-500 text-white',
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    style: 'bg-blue-500 text-white',
  },
};

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // Allow for fade-out animation
  };

  const { icon, style } = toastConfig[type];

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm transition-opacity duration-300 ${style} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button onClick={handleDismiss} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-full inline-flex hover:bg-white/20">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
