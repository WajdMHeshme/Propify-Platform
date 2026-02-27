import PropertyCard from "../../components/cards/PropertyCard";
import PropertyCardSkeleton from "../../components/cards/PropertyCardSkeleton";
import TitleSection from "./TitleSection";
import { sectionsTitles } from "../../data/data";
import { useProperties } from "../../hooks/useProperties";

const PropertiesSection = () => {
  const { data, isLoading, isError } = useProperties();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <TitleSection
          title={sectionsTitles?.properties.title}
          keyword={sectionsTitles?.properties.keyword}
          desc={sectionsTitles?.properties.desc}
          underline
          underlineSize="lg"
          underlineClassName="text-primary"
        />

        {isError && (
          <div className="text-center py-10 text-red-500">
            Failed to load properties
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && !data?.data?.length
            ? Array.from({ length: 6 }).map((_, idx) => (
                <PropertyCardSkeleton key={idx} />
              ))
            : data?.data.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;