export interface Property {
  id: number;
  title: string;
  type: string;
  city: string;
  address: string;
  rooms: number;
  area: string;
  price: string;
  status: "available" | "booked" | "rented" | "hidden";
  is_furnished: boolean;
  main_image: string;
}


// property type props 

export interface PropertyCardProps {
  property: Property;
}

