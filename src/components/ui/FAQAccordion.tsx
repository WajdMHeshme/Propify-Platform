import { useState } from "react";
import type { FaqAccordionProps } from "../../types/ui";

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-4">
      {items?.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-xl shadow-md transition-shadow duration-300 ${
              isOpen ? "shadow-lg" : "shadow-sm"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className={`
                w-full flex items-center justify-between px-6 py-4 text-left rounded-xl
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                ${isOpen ? "bg-primary text-white" : "bg-white text-gray-800 hover:bg-primary/10"}
                transition-colors duration-300
              `}
            >
              <span className="font-medium">{item.question}</span>

              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-white" : "rotate-0 text-primary"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`
                px-6 overflow-hidden transition-all duration-300
                ${isOpen ? "py-4 max-h-80" : "py-0 max-h-0"}
                bg-primary/5 rounded-b-xl
              `}
              aria-hidden={!isOpen}
            >
              <p className="text-gray-700">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
