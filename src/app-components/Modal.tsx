import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface ModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  description: string;
  confirmText?: string; 
  cancelText?: string; 
  confirmColor?: string; 
  cancelColor?: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  description,
  confirmText,
  cancelText,
  confirmColor = "bg-[#6CBD45] text-white", 
  cancelColor = "bg-white border border-gray-200 text-[#2E434E]",
  onConfirm,
  children
}) => {
  if (!isOpen) return null; 

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative p-4 w-[28rem] max-h-full mt-16">
        <div className="relative bg-white p-4 md:p-5 rounded-lg shadow">
          <div className="flex items-center justify-between border-b pb-3 rounded-t">
            <h3 className="text-sm font-medium text-[#2E434E]">{description}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[12px] w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <XMarkIcon className="w-5 h-5"/>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="my-4 space-y-4">
            {children}
          </div>

          {/* Modal Actions */}
          {(confirmText && cancelText) &&
          <div className="flex items-center justify-center gap-4 py-4 rounded-b">
            <button
              type="button"
              className={`py-2.5 px-5 text-sm font-medium rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 ${cancelColor}`}
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`py-2.5 px-5 text-sm font-medium rounded-lg focus:outline-none ${confirmColor}`}
            >
              {confirmText}
            </button>
          </div>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
