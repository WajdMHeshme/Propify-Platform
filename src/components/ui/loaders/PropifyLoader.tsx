type Props = {
  fullScreen?: boolean;
  text?: string;
};

export default function PropifyLoader({
  fullScreen = true,
  text = "Propify",
}: Props) {
  const wrapper = fullScreen
    ? "fixed inset-0 z-[9999]"
    : "relative w-full min-h-[240px]";

  return (
    <div className={`${wrapper} overflow-hidden bg-(--color-bg)`}>
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-(--color-bg)" />
        <div className="absolute top-1/2 left-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="grid h-full min-h-[inherit] place-items-center px-4">
        <div className="flex flex-col items-center gap-5">
          {/* Logo Text */}
          <div className="flex items-end gap-1 select-none">
            {text.split("").map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className="propify-letter text-4xl sm:text-5xl font-semibold tracking-tight text-primary"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* Loading Bar */}
          <div className="h-1 w-56 overflow-hidden rounded-full bg-border">
            <div className="propify-line h-full w-[35%] rounded-full bg-primary" />
          </div>

          <p className="text-sm text-slate-500">Loading…</p>
        </div>
      </div>

      <style>{`
        .propify-letter {
          animation: propifyFloat 1.2s ease-in-out infinite;
          opacity: .9;
        }

        @keyframes propifyFloat {
          0%,100% { transform: translateY(0); opacity:.85; }
          50% { transform: translateY(-6px); opacity:1; }
        }

        .propify-line {
          animation: propifyMove 1.1s ease-in-out infinite;
        }

        @keyframes propifyMove {
          0% { transform: translateX(-70%); }
          100% { transform: translateX(260%); }
        }
      `}</style>
    </div>
  );
}