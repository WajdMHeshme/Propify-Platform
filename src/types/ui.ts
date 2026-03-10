import type { IconType } from "react-icons";
import type { ContactHeroProps } from "./properties";

export interface TitleSectionProps {
  title: string;
  desc: string;
  keyword: string;
  underline?: boolean;
  underlineSize?: "sm" | "md" | "lg";
  underlineClassName?: string; // pass a tailwind text-color class, e.g. "text-primary"
}

//Hero filter section
export interface FilterProps {
  onFilterChange?: (filters: {
    city: string;
    price: string;
    type: string;
  }) => void;
}

export type   HeroFilterProps = FilterProps & {
  hidden?: boolean; 
};

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

// Faq Section
export type FAQItem = {
  id: number;
  question: string;
  answer: string;
};
export interface FaqAccordionProps {
  items: FAQItem[];
}

// Choose Us Card

export type IconKey = "home" | "shield" | "clock" | "support";

export interface ChooseUsCardProps {
  icon: IconKey;
  title: string;
  description: string;
}

export type FavProps = {
  favorites: any[];
  loading?: boolean;
  onRefresh?: () => void;
};

export type RecentBookingsProps = {
  bookings: any[];
  loading?: boolean;
};

export interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

export type SliderProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slidesToShow?: number;
  gap?: number;
  className?: string;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
};

export type DotsProps = {
  itemsLength: number;
  visibleCount: number;
  currentIndex: number;
  onClick: (index: number) => void;
};
export type SharedHeroProps = ContactHeroProps & {
  showFilter?: boolean; 
  onFilterChange?: (filters: { city: string; price: string; type: string }) => void;
};
export type UseSliderOptions = {
  slidesToShow?: number;
  gap?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
};

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}
