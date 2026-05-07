import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  variant === 'danger' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-primary/10 text-primary"
                )}>
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
              </div>
              <p className="text-secondary leading-relaxed">{message}</p>
            </div>
            <div className="bg-secondary/5 p-4 flex gap-3 justify-end">
              <button onClick={onClose} className="btn btn-secondary">
                {cancelText}
              </button>
              <button 
                onClick={onConfirm} 
                className={cn(
                  "btn",
                  variant === 'danger' ? "btn-danger" : "btn-primary"
                )}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
