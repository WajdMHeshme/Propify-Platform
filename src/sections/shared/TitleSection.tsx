import type { TitleSectionProps } from "../../types/ui";

const TitleSection = ({
  title,
  desc,
  keyword,
  underline = false,
  underlineSize = "md",
  underlineClassName = "text-primary",
}: TitleSectionProps) => {
  // map sizes to width classes for the svg container
  const sizeCls =
    underlineSize === "sm"
      ? "w-40 md:w-56"
      : underlineSize === "lg"
      ? "w-80 md:w-96"
      : "w-48 md:w-72"; // md by default

  return (
    <div className="text-center mx-auto mb-14">
      <h1 className="text-3xl md:text-5xl font-bold text-black">
        {title}{" "}
        <span className="text-primary font-extrabold">{keyword}</span>
      </h1>

      <p className="mt-4 text-gray-500 text-base">{desc}</p>

      {underline && (
        <div className="mt-6 flex justify-center">
          {/* svg uses currentColor so we can control color via a text- class */}
          <svg
            className={`${sizeCls} ${underlineClassName}`}
            viewBox="0 0 200 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            role="img"
          >
            {/* darker main stroke */}
            <path
              d="M4 10 C30 2 70 18 196 10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.95"
            />
            {/* lighter secondary stroke for the double-line effect */}
            <path
              d="M4 12 C30 4 70 20 196 12"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="opacity-40"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default TitleSection;
