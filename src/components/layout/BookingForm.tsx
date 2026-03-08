// src/components/layout/BookingForm.tsx
import { useState, useRef, useEffect } from "react";
import { FiPhone, FiShare2, FiCalendar } from "react-icons/fi";
import { RiHeartAdd2Line } from "react-icons/ri";
import Flatpickr from "flatpickr";
import { bookProperty } from "../../services/property.service";
import Modal from "../modal/Modal"; // استدعاء المودال الجديد
import { useFavorites } from "../../hooks/useFavorites";

interface BookingFormProps {
  propertyId: number | string;
}

export default function BookingForm({ propertyId }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    desc: "",
  });

  const [savingFav, setSavingFav] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);

  // Favorites hook - use addFavorite directly
  const { favorites, addFavorite } = useFavorites();

  // Initialize Flatpickr
  useEffect(() => {
    if (dateInputRef.current) {
      Flatpickr(dateInputRef.current, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
      });
    }
  }, []);

  const handleBooking = async () => {
    if (!dateInputRef.current?.value) {
      showModal("error", "Missing Date & Time", "Please select a date & time first.");
      return;
    }

    setLoading(true);
    try {
      await bookProperty({
        property_id: Number(propertyId),
        date_time: dateInputRef.current.value,
      });
      showModal("success", "Booking Sent", "Your booking request has been sent successfully!");
      dateInputRef.current.value = "";
    } catch (err: any) {
      showModal(
        "error",
        "Booking Failed",
        err?.message || "There was an issue sending your booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
    console.log("Booking propertyId:", propertyId, typeof propertyId);
  };

  const showModal = (type: "success" | "error", title: string, desc: string) => {
    setModalData({ isOpen: true, type, title, desc });
  };

  // handle Save (always add favorite)
  const handleSave = async () => {
    if (savingFav) return;
    setSavingFav(true);

    try {
      // if already favorited (by property id) show message and do nothing
      const already = favorites.find((f) => String(f.property?.id) === String(propertyId));
      if (already) {
        showModal("success", "Already Saved", "This property is already in your favorites.");
        return;
      }

      // call addFavorite (your hook does optimistic update + returns created)
      const created = await addFavorite(propertyId);
      showModal("success", "Added to Favorites", "This property was added to your favorites.");
      return created;
    } catch (err: any) {
      showModal(
        "error",
        "Favorite Failed",
        err?.message || "Failed to add to favorites. Please try again."
      );
      throw err;
    } finally {
      setSavingFav(false);
    }
  };

  return (
    <>
      <div className="border-2 border-gray-200 rounded-2xl p-6 bg-white space-y-4 shadow-sm">
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:scale-105 transition-transform">
          <FiPhone /> Request a Visit
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSave}
            disabled={savingFav}
            className="py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            title="Save"
          >
            <RiHeartAdd2Line />
            {savingFav ? "Saving..." : "Save"}
          </button>

          <button className="py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl hover:bg-blue-50 transition-colors">
            <FiShare2 /> Share
          </button>
        </div>

        <hr className="border-gray-200 my-4" />

        <h3 className="font-semibold text-lg text-gray-800">Request Booking</h3>
        <div className="relative">
          <input
            ref={dateInputRef}
            type="text"
            placeholder="Choose date & time"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            readOnly
          />
          <FiCalendar className="absolute right-3 top-3 text-gray-400" />
        </div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-3 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Booking Request"}
        </button>
      </div>

      <Modal
        isOpen={modalData.isOpen}
        type={modalData.type}
        title={modalData.title}
        desc={modalData.desc}
        onClose={() => setModalData((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}