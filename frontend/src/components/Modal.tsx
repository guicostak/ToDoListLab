import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-background-task rounded-lg shadow-lg p-10 w-4/12">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
