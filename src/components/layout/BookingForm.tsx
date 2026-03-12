// src/components/layout/BookingForm.tsx
import  { useState, useRef, useEffect, type RefObject } from "react";
import { FiPhone, FiShare2, FiCalendar } from "react-icons/fi";
import { RiHeartAdd2Line } from "react-icons/ri";
import Flatpickr from "flatpickr";
import { bookProperty } from "../../services/property.service";
import Modal from "../modal/Modal";
import { useFavorites } from "../../hooks/useFavorites";
import { useTranslation } from "react-i18next";

interface BookingFormProps {
  propertyId: number | string;
  dateInputRef?: RefObject<HTMLInputElement | null>;
}

export default function BookingForm({
  propertyId,
  dateInputRef: externalRef,
}: BookingFormProps) {
  const { t } = useTranslation("properties");
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    desc: "",
  });
  const [savingFav, setSavingFav] = useState(false);
  const internalRef = useRef<HTMLInputElement>(null);
  const dateInputRef = externalRef || internalRef;

  const { favorites, addFavorite } = useFavorites();

  useEffect(() => {
    if (dateInputRef.current) {
      Flatpickr(dateInputRef.current, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
      });
    }
  }, [dateInputRef]);

  const showModal = (type: "success" | "error", title: string, desc: string) => {
    setModalData({ isOpen: true, type, title, desc });
  };

  const handleBooking = async () => {
    if (!dateInputRef.current?.value) {
      showModal("error", t("missingDateTitle"), t("missingDateDesc"));
      return;
    }

    setLoading(true);
    try {
      await bookProperty({
        property_id: Number(propertyId),
        date_time: dateInputRef.current.value,
      });
      showModal("success", t("bookingSentTitle"), t("bookingSentDesc"));
      dateInputRef.current.value = "";
    } catch (err: any) {
      showModal(
        "error",
        t("bookingFailedTitle"),
        err?.message || t("bookingFailedDesc")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (savingFav) return;
    setSavingFav(true);
    try {
      const already = favorites.find(
        (f) => String(f.property?.id) === String(propertyId)
      );
      if (already) {
        showModal("success", t("alreadySavedTitle"), t("alreadySavedDesc"));
        return;
      }
      const created = await addFavorite(propertyId);
      showModal("success", t("addedToFavoritesTitle"), t("addedToFavoritesDesc"));
      return created;
    } catch (err: any) {
      showModal(
        "error",
        t("favoriteFailedTitle"),
        err?.message || t("favoriteFailedDesc")
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
          <FiPhone /> {t("requestVisit")}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSave}
            disabled={savingFav}
            className="py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            title={t("save")}
          >
            <RiHeartAdd2Line />
            {savingFav ? t("saving") : t("save")}
          </button>

          <button className="py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl hover:bg-blue-50 transition-colors">
            <FiShare2 /> {t("share")}
          </button>
        </div>

        <hr className="border-gray-200 my-4" />

        <h3 className="font-semibold text-lg text-gray-800">{t("requestBooking")}</h3>
        <div className="relative">
          <input
            ref={dateInputRef}
            type="text"
            placeholder={t("chooseDateTime")}
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
          {loading ? t("sending") : t("sendBookingRequest")}
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