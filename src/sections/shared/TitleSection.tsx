import type { TitleSectionProps } from "../../types/ui";
import { useTranslation } from "react-i18next";

const TitleSection = ({
  sectionKey,
  title: propTitle,
  desc: propDesc,
  keyword: propKeyword,
  underline = false,
  underlineSize = "md",
  underlineClassName = "text-primary",
}: Omit<TitleSectionProps, "title" | "desc" | "keyword"> & {
  sectionKey?: string;
  title?: string;
  desc?: string;
  keyword?: string;
}) => {
  const { t } = useTranslation("titleSection");

  // translations
  const rawTitle = sectionKey ? t(`${sectionKey}.title`) : undefined;
  const rawKeyword = sectionKey ? t(`${sectionKey}.keyword`) : undefined;
  const rawDesc = sectionKey ? t(`${sectionKey}.desc`) : undefined;

  const title =
    rawTitle && rawTitle !== `${sectionKey}.title` ? rawTitle : propTitle ?? "";
  const keyword =
    rawKeyword && rawKeyword !== `${sectionKey}.keyword` ? rawKeyword : propKeyword ?? "";
  const desc =
    rawDesc && rawDesc !== `${sectionKey}.desc` ? rawDesc : propDesc ?? "";

  const sizeCls =
    underlineSize === "sm"
      ? "w-40 md:w-56"
      : underlineSize === "lg"
      ? "w-80 md:w-96"
      : "w-48 md:w-72"; // md by default

  return (
    <div className="text-center mx-auto mb-14">
      <h1
        className="text-3xl md:text-5xl font-bold text-black"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        {title}{" "}
        {keyword && (
          <span
            className="text-primary font-extrabold"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {keyword}
          </span>
        )}
      </h1>

      {desc && (
        <p
          className="mt-4 text-gray-500 text-base"
          data-aos="fade-up"
          data-aos-delay={300}
        >
          {desc}
        </p>
      )}

      {underline && (
        <div
          className="mt-6 flex justify-center"
          data-aos="fade-up"
          data-aos-delay={400}
        >
          <svg
            className={`${sizeCls} ${underlineClassName}`}
            viewBox="0 0 200 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            role="img"
          >
            <path
              d="M4 10 C30 2 70 18 196 10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.95"
            />
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