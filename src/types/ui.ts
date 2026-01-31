import type { IconType } from "react-icons";

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
