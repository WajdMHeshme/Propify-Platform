import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiHeartStraightBold,
  PiBookmarksSimpleBold,
  PiCaretDownBold,
} from "react-icons/pi";

export default function MyActivityDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger Button */}
<button
  onClick={() => setOpen(!open)}
  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition 
  ${open ? "text-primary bg-gray-50" : "text-gray-600 hover:bg-gray-100"}`}
>
  Activity
  <PiCaretDownBold
    size={14}
    className={`transition-transform ${open ? "rotate-180 text-primary" : ""}`}
  />
</button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-primary rounded-[4px] shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="py-2">

            <button
              onClick={() => go("/favorites")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition"
            >
              <PiHeartStraightBold size={18} className="text-primary" />
              <span>Favorites</span>
            </button>

            <button
              onClick={() => go("/bookings")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition"
            >
              <PiBookmarksSimpleBold size={18} className="text-primary" />
              <span>My Bookings</span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}