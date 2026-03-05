export interface Property {
  id: number
  title: string
  type: string | null
  city: string
  neighborhood: string
  address: string
  rooms: number
  area: string
  price: string
  status: string
  is_furnished: boolean
  description: string
  main_image: string
  images: string[]  
  amenities: string[]
  created_at: string
}
export interface PropertiesResponse {
  data: Property[]
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
