import { FaUserShield, FaLock, FaComments, FaBolt } from "react-icons/fa";
import type { FAQItem } from "../types/ui";

export const sectionsTitles = {
  properties: {
    title: "Explore Our",
    keyword: "Properties",
    desc: "Find the perfect home that matches your lifestyle and budget.",
  },
  home: {
    title: "Find Your",
    keyword: "Dream Home",
    desc: "Browse a wide range of properties in top locations.",
  },
  contact: {
    title: "Get In",
    keyword: "Touch",
    desc: "We are here to help you with any questions or inquiries.",
  },
};

export const features = [
  {
    title: "Secure account creation",
    desc: "StudentHub provides secure account creation of both student and landlord by strong and secured verification process.",
    icon: FaUserShield,
  },
  {
    title: "Rental Privacy Policy",
    desc: "Following governmental regulation on renting as a privacy policy in website protects students and make their payments secured.",
    icon: FaLock,
  },
  {
    title: "Direct Communication",
    desc: "Students can communicate directly with landlords to ask questions and get clear answers before booking.",
    icon: FaComments,
  },

  {
    title: "Fast Booking Process",
    desc: "Book accommodations quickly and easily from anywhere around the world with a smooth process.",
    icon: FaBolt,
  },
];
export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "What is Project?",
    answer:
      "Project is a sample product used to show how the FAQ accordion looks. You can replace this text with the real answer coming from your API.",
  },
  {
    id: 2,
    question: "How can I integrate the API?",
    answer:
      "Call your API endpoint (for example /faq) and map the received data into the same shape used here (question + answer).",
  },
  {
    id: 3,
    question: "Can I customize the styles?",
    answer:
      "Yes — the component is built with Tailwind. Tweak colors, spacing, and the SVG brush under the title to fit your design.",
  },
  {
    id: 4,
    question: "Is this accessible?",
    answer:
      "Buttons are keyboard-focusable and announce expansion state with aria-expanded. You can improve further by managing focus on open/close.",
  },
];

export const chooseUsFeatures = [
  {
    id: 1,
    icon: "home",
    title: "Verified Properties",
    description:
      "All properties are carefully reviewed to ensure quality, safety, and accurate information.",
  },
  {
    id: 2,
    icon: "shield",
    title: "Secure Payments",
    description:
      "Your payments are protected with advanced security and trusted payment gateways.",
  },
  {
    id: 3,
    icon: "clock",
    title: "Fast & Easy Booking",
    description:
      "Book your property in just a few clicks with instant confirmation.",
  },
  {
    id: 4,
    icon: "support",
    title: "24/7 Support",
    description:
      "Our support team is always available to help you anytime, anywhere.",
  },
] as const;

