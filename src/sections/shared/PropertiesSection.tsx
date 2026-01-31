import PropertyCard from "../../components/cards/PropertyCard";
import { propertiesData } from "../../data/properties.data";
import TitleSection from "./TitleSection";
import { sectionsTitles } from "../../data/data";

const PropertiesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Section */}
        <TitleSection
          title={sectionsTitles?.properties.title}
          keyword={sectionsTitles?.properties.keyword}
          desc={sectionsTitles?.properties.desc}
        />

        {/* Properties Grid */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
        >
          {propertiesData?.data.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
