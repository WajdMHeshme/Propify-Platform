import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-6">
        <h1 className="text-4xl text-center font-bold bg-transparent">
          Propify
        </h1>

        {/* Links */}
        <nav className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:opacity-80">Home</a>
          <a href="#" className="hover:opacity-80">Properties</a>
          <a href="#" className="hover:opacity-80">Contact Us</a>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
          <SocialIcon><FaFacebookF /></SocialIcon>
          <SocialIcon><FaLinkedinIn /></SocialIcon>
          <SocialIcon><FaTwitter /></SocialIcon>
        </div>

        {/* Divider */}
        <div className="w-full h-px rounded-full bg-white my-4" />

        {/* Copyright */}
        <p className="text-xs opacity-80">
          Copyright © Propify
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary cursor-pointer hover:scale-105 transition">
      {children}
    </div>
  );
}
