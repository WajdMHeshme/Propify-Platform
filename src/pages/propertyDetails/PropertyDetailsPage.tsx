import { useState, useEffect, useRef } from "react";
import {
  FaBed,
  FaRulerCombined,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  FiPhone,
  FiHeart,
  FiShare2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
} from "react-icons/fi";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { RiHeartAdd2Line } from "react-icons/ri";


/* Injected CSS */
const injectedCSS = `
:root{
  --color-primary:#5659f9;
  --color-primary-dark:#4f46e5;
  --color-bg:#ffffff;
  --color-bg-muted:#f8fafc;
  --color-border:#e2e8f0;
  --color-text:#0f172a;
  --radius-lg:0.75rem;
}

.property-root { background: var(--color-bg); color: var(--color-text); }
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
.chip {
  background: linear-gradient(180deg,#ffffff,#f8fafc);
  border: 1px solid var(--color-border);
  transition: all .25s ease;
}
.chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,.06);
}
.btn-grad {
  background: linear-gradient(90deg,var(--color-primary),var(--color-primary-dark));
  color:white;
}
`;

function useInjectCSS(css) {
  useEffect(() => {
    const id = "property-details-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = css;
    document.head.appendChild(style);
  }, [css]);
}

export default function PropertyDetailsPage({ property = null, images = [] }) {
  useInjectCSS(injectedCSS);

  const demo = {
    id: 16,
    title: "Modern Family Home with Pool",
    city: "Dubai",
    neighborhood: "Jumeirah",
    address: "Street 12, Building A",
    rooms: 3,
    area: "465",
    price: "120000",
    status: "available",
    is_furnished: true,
    description:
      "Beautiful modern home with spacious rooms, large balcony and private pool.",
    created_at: "2026-02-05",
  };

  const demoImages = [
    "/assets/images/property.webp",
    "/assets/images/imageSlideCard2.webp",
    "/assets/images/wallpaperflare.com_wallpaper(13).jpg",
  ];

  const otherProperties = [
    {
      id: 1,
      title: "Luxury Apartment",
      city: "Dubai",
      price: "98000",
      image: "/assets/images/property.webp",
    },
    {
      id: 2,
      title: "Cozy Studio",
      city: "Dubai",
      price: "65000",
      image: "/assets/images/imageSlideCard2.webp",
    },
    {
      id: 3,
      title: "Sea View Villa",
      city: "Dubai",
      price: "210000",
      image: "/assets/images/wallpaperflare.com_wallpaper(13).jpg",
    },
  ];

  const prop = property || demo;
  const gallery = images.length ? images : demoImages;

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dateInputRef = useRef(null);
const [, setScheduledAt] = useState("");
useEffect(() => {
  if (!dateInputRef.current) return;

  const picker = flatpickr(dateInputRef.current, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    minDate: "today",
    onChange: (selectedDates) => {
      if (selectedDates.length) {
        setScheduledAt(selectedDates[0].toISOString());
      }
    },
  });

  return () => picker.destroy();
}, []);




  const formatPrice = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(Number(v));

  return (
    <div className="property-root p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Other Properties
            </h3>

            {otherProperties.map((item) => (
              <div key={item.id} className="card overflow-hidden">
                <img src={item.image} className="h-32 w-full object-cover" />
                <div className="p-3">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <div className="text-xs text-gray-500">{item.city}</div>
                  <div className="mt-2 font-semibold text-indigo-600 text-sm">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <img
              src={gallery[activeIdx]}
              className="w-full h-[420px] object-cover cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Thumbnails */}
            <div className="flex gap-3 p-4 bg-gray-50 overflow-x-auto">
              {gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2
                    ${activeIdx === idx
                      ? "border-indigo-500"
                      : "border-transparent opacity-70 hover:opacity-100"}`}
                />
              ))}
            </div>

            <div className="p-6">
              <span
                className={`inline-block mb-2 px-3 py-1 text-xs rounded-full
                ${prop.status === "booked"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"}`}
              >
                {prop.status}
              </span>

              <h1 className="text-3xl font-semibold">{prop.title}</h1>

              <div className="mt-2 text-sm text-gray-500 flex gap-2">
                <FaMapMarkerAlt /> {prop.city} — {prop.neighborhood}
              </div>

              <div className="mt-4 text-3xl font-bold text-indigo-600">
                {formatPrice(prop.price)}
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">
                {prop.description}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="chip p-4 flex justify-center items-center gap-3">
                  <FaBed className="text-indigo-500 text-xl" />
                  <div>
                    <div className="text-xs text-gray-500">Rooms</div>
                    <div className="font-medium">{prop.rooms}</div>
                  </div>
                </div>

                <div className="chip p-4 flex justify-center items-center gap-3">
                  <FaRulerCombined className="text-indigo-500 text-xl" />
                  <div>
                    <div className="text-xs text-gray-500">Area</div>
                    <div className="font-medium">{prop.area} m²</div>
                  </div>
                </div>

                <div className="chip p-4 flex justify-center items-center  gap-3">
                  <FaMapMarkerAlt className="text-indigo-500 text-xl" />
                  <div>
                    <div className="text-xs text-gray-500">Address</div>
                    <div className="font-medium">{prop.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
<aside>
  <div className="card p-6 sticky top-6 shadow-lg rounded-2xl bg-white">
    <button className="w-full btn-grad py-3 rounded-lg flex justify-center items-center gap-2 transition-transform transform hover:scale-105">
      <FiPhone /> Request a Visit
    </button>

    <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-2">
      <button className="chip rounded-2xl py-2 flex justify-center items-center gap-2 border border-gray-300 hover:bg-red-50 transition-colors">
        <RiHeartAdd2Line  /> Save
      </button>
      <button className="chip rounded-2xl py-2 flex justify-center items-center gap-2 border border-gray-300 hover:bg-blue-50 transition-colors">
        <FiShare2 /> Share
      </button>
    </div>

    <hr className="my-6 border-primary" />

    <h3 className="font-semibold mb-4 text-primary text-lg">Request Booking</h3>

    <form className="space-y-4">
      <input type="hidden" name="property_id" value={prop.id} />

      <div>
        <label className="text-sm text-gray-700 mb-1 block">Select date & time</label>
        <div className="relative">
          <input
            ref={dateInputRef}
            type="text"
            placeholder="Choose date & time"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            readOnly
          />
          <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <button
        type="button"
        className="w-full btn-grad py-3 rounded-lg font-medium transition-transform transform hover:scale-105"
      >
        Send Booking Request
      </button>
    </form>
  </div>
</aside>

      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative max-w-5xl w-full">
            <img src={gallery[activeIdx]} className="w-full h-[70vh] object-contain" />

            <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 bg-white p-2 rounded-full">
              <FiX />
            </button>

            <button onClick={() => setActiveIdx((i) => (i - 1 + gallery.length) % gallery.length)}
              className="absolute left-4 top-1/2 bg-white p-2 rounded-full">
              <FiChevronLeft />
            </button>

            <button onClick={() => setActiveIdx((i) => (i + 1) % gallery.length)}
              className="absolute right-4 top-1/2 bg-white p-2 rounded-full">
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
