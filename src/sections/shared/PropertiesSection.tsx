// src/sections/shared/PropertiesSliderSection.tsx
import TitleSection from "./TitleSection";
import { useProperties } from "../../hooks/useProperties";
import PropertyCard from "../../components/cards/PropertyCard";
import PropertyCardSkeleton from "../../components/ui/loaders/PropertyCardSkeleton";
import Slider from "../../components/ui/Slider";
import { useState } from "react";
import { useFavorites } from "../../hooks/useFavorites";

const PropertiesSliderSection = () => {
  const [page] = useState(1);
  const { data, isLoading } = useProperties({ page, limit: 12 });
  const items = data?.data ?? [];

  const { favorites, toggleFavorite } = useFavorites();
  const isFav = (propId: any) =>
    favorites.some((f) => String(f.property?.id) === String(propId));

  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
<TitleSection sectionKey="properties" underline underlineSize="lg" />
        {isLoading ? (
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full md:w-1/3">
                <PropertyCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <Slider
            items={items}
            slidesToShow={3}
            gap={16}
            autoplay={false}
            renderItem={(property: any) => (
              <PropertyCard
                property={property}
                isFavorite={isFav(property.id)}
                onToggleFavorite={async (propertyId) => {
                  try {
                    await toggleFavorite(propertyId);
                  } catch (err) {
                    console.error("toggle favorite failed", err);
                  }
                }}
              />
            )}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesSliderSection;