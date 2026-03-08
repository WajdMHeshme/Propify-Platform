// src/components/modal/Modal.tsx
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  type: "success" | "error";
  title?: string;
  desc?: string;
  onClose: () => void;
  /**
   * null => no auto-close
   * undefined => default: success => 1500ms, error => null
   */
  autoCloseMs?: number | null;
}

export default function Modal({
  isOpen,
  type,
  title,
  desc,
  onClose,
  autoCloseMs,
}: ModalProps) {
  const [show, setShow] = useState(false);

  const resolvedAutoCloseMs =
    typeof autoCloseMs !== "undefined" ? autoCloseMs : type === "success" ? 1500 : null;

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden"; // منع scroll بالخلفية
    } else {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setShow(false), 300); // وقت الانيميشن قبل unmount
      return () => clearTimeout(timeout);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // auto close handling
  useEffect(() => {
    if (isOpen && resolvedAutoCloseMs !== null) {
      const t = setTimeout(() => onClose(), resolvedAutoCloseMs);
      return () => clearTimeout(t);
    }
  }, [isOpen, resolvedAutoCloseMs, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-white rounded-2xl max-w-md w-full p-6 relative text-center transform transition-all duration-200 shadow-xl ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        {/* Animated Icon */}
        <div className="w-20 h-20 mx-auto mb-4 relative">
          {type === "success" ? (
            <svg className="w-20 h-20 text-green-500" viewBox="0 0 52 52" aria-hidden>
              <circle
                className="stroke-current text-green-200"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                strokeWidth="2"
              />
              <path
                className="stroke-current text-green-500"
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="48"
                strokeDashoffset="48"
                d="M14 27l7 7 17-17"
                style={{ animation: "draw 0.5s ease forwards 0.2s" }}
              />
            </svg>
          ) : (
            <svg className="w-20 h-20 text-red-500" viewBox="0 0 52 52" aria-hidden>
              <circle
                className="stroke-current text-red-200"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                strokeWidth="2"
              />
              <path
                className="stroke-current text-red-500"
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="34"
                strokeDashoffset="34"
                d="M16 16l20 20 M36 16L16 36"
                style={{ animation: "draw 0.5s ease forwards 0.2s" }}
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2">
          {title ?? (type === "success" ? "Success" : "Something went wrong")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {desc ??
            (type === "success"
              ? "Your action completed successfully."
              : "There was an issue. Please try again or contact support.")}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-full py-3 rounded-lg text-white transition-colors ${
            type === "success" ? "bg-primary hover:bg-primary-700" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {type === "success" ? "Continue" : "Close"}
        </button>
      </div>

      {/* SVG Draw Animation */}
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}