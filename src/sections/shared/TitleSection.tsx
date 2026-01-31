import type { TitleSectionProps } from "../../types/ui";

const TitleSection = ({ title, desc, keyword }: TitleSectionProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <h1 className="text-3xl md:text-5xl font-bold text-black">
        {title}{" "}
        <span className="text-primary font-extrabold ">
          {keyword}
        </span>
      </h1>

      <p className="mt-4 text-gray-500 text-base">
        {desc}
      </p>
    </div>
  );
};

export default TitleSection;
