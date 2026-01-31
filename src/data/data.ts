import { FaUserShield, FaLock, FaComments, FaBolt } from "react-icons/fa";

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
