// src/components/layout/BookingModal.tsx
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

interface BookingModalProps {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export default function BookingModal({ isOpen, type, message, onClose }: BookingModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300); // مدة الانميشن
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl max-w-md w-full p-6 relative text-center transform transition-all duration-200 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        {/* Animated Icon */}
        <div className="w-20 h-20 mx-auto mb-4 relative">
          {type === "success" ? (
            <svg
              className="w-20 h-20 text-green-500"
              viewBox="0 0 52 52"
            >
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
                style={{
                  animation: "draw 0.5s ease forwards 0.3s",
                }}
              />
            </svg>
          ) : (
            <svg
              className="w-20 h-20 text-red-500"
              viewBox="0 0 52 52"
            >
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
                style={{
                  animation: "draw 0.5s ease forwards 0.3s",
                }}
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2">
          {type === "success" ? "Booking Request Sent" : "Booking Failed"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-4">{message}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-full py-3 rounded-lg text-white ${
            type === "success" ? "bg-primary hover:bg-primary-700" : "bg-red-500 hover:bg-red-600"
          } transition-colors`}
        >
          {type === "success" ? "Go to Home Page" : "Close"}
        </button>
      </div>

      {/* SVG Draw Animation */}
      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}