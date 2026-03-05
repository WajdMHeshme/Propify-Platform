// src/components/layout/BookingForm.tsx
import { useState, useRef, useEffect } from "react";
import { FiPhone, FiShare2, FiCalendar } from "react-icons/fi";
import { RiHeartAdd2Line } from "react-icons/ri";
import Flatpickr from "flatpickr";
import { bookProperty } from "../../services/property.service";
import BookingModal from "../modal/BookingModal";

interface BookingFormProps {
  propertyId: number | string;
}

export default function BookingForm({ propertyId }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);

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
      showModal("Please select a date & time first", "error");
      return;
    }

    setLoading(true);
    try {
      await bookProperty({
        property_id: propertyId,
        date_time: dateInputRef.current.value,
      });
      showModal("Your booking request has been sent!", "success");
      dateInputRef.current.value = "";
    } catch (err: any) {
      showModal(err.message || "Booking failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (message: string, type: "success" | "error") => {
    setModalMessage(message);
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className="border-2 border-gray-200 rounded-2xl p-6 bg-white space-y-4 shadow-sm">
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:scale-105 transition-transform">
          <FiPhone /> Request a Visit
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button className="py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl hover:bg-red-50 transition-colors">
            <RiHeartAdd2Line /> Save
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

      <BookingModal
        isOpen={modalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}