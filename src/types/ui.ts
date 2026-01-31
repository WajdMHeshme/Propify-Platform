import type { IconType } from "react-icons";

export interface TitleSectionProps {
  title: string;
  desc: string;
  keyword: string;
}

//Hero filter section
export interface FilterProps {
  onFilterChange?: (filters: {
    city: string;
    price: string;
    type: string;
  }) => void;
}

// float animation component
export interface FloatingIconsProps {
  starCount?: number;
}


//features card 

export interface FeatureCardProps {
  title: string;
  desc: string;
  icon: IconType;
}
