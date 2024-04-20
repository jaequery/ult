import React, { useCallback, useEffect, useRef } from "react";

type DialogProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Dialog: React.FC<DialogProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal content

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  const handleEscapeKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    // Disable body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      // Re-enable body scroll
      document.body.style.overflow = originalStyle;

      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [handleEscapeKeyPress, handleOutsideClick]);

  return (
    <div className="fixed z-30 overflow-y-auto overflow-scroll top-0 w-full left-0 p-8 modal-content">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          ref={modalRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
