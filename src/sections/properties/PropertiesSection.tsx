import React from "react";

import { useProperties } from "../../hooks/useProperties";
import PropertyWideCard from "../../components/cards/PropertyWideCard";
import { CardSkeleton } from "../../components/ui/loaders/CardSkeleton";
import type { Property } from "../../types/properties";


export const PropertiesSection: React.FC = () => {
  const { data, isLoading, isError } = useProperties();
  const properties = data?.data ?? [];

  return (
    <section className="py-12 w-full px-6 lg:px-16 space-y-8">
      {isError && (
        <div className="text-center py-10 text-red-500">
          Failed to load properties
        </div>
      )}

      <div className="flex flex-col space-y-8">
        {isLoading && !properties.length
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : properties.map((property: Property) => (
              <PropertyWideCard key={property.id} property={property} />
            ))}
      </div>
    </section>
  );
};

export default PropertiesSection;