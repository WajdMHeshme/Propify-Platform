interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

export default function Hamburger({ open, onClick }: HamburgerProps) {

  const line =
    "absolute w-6 h-[2px] bg-current transition-all duration-300";

  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex items-center justify-center text-primary"
    >

      <span
        className={`${line} ${
          open
            ? "rotate-45"
            : "-translate-y-2"
        }`}
      />

      <span
        className={`${line} ${
          open
            ? "opacity-0"
            : ""
        }`}
      />

      <span
        className={`${line} ${
          open
            ? "-rotate-45"
            : "translate-y-2"
        }`}
      />

    </button>
  );
}