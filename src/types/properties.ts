// src/types/properties.ts
export interface Property {
  [x: string]: any;
  id: number;
  title: string;
  address?: string;
  city?: string;
  price?: number | string;
  price_weekly?: number | string; // <-- أضف هذه الخاصية
  main_image?: string;
  images?: string[];
  rooms?: number;
  area?: number;
  status?: string;
  featured?: boolean; // <-- أضف هذه الخاصية إذا كنت تستخدمها
  description?: string;
}
export interface PropertiesResponse {
  data: Property[];
  meta?: {
    total?: number;
    per_page?: number;
    current_page?: number;
  };
}

// Generic type for paginated API responses
export interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  current_page?: number;
  per_page?: number;
}



// property type props 

export interface PropertyCardProps {
  property: Property;
}


export interface DetailsProps {
  property?: any;
  images?: string[];
}

export interface ContactHeroProps {
  smallTitle?: string;
  title?: string;
  desc?: string;
}

export interface PropertiesFilters {
  page: number;
  limit: number;
  city?: string;
  min_price?: number;
  max_price?: number;
  status?: string;
}

export type Props = PropertyCardProps & {
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: number | string) => void;
};