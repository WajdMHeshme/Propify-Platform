// src/pages/BookingMessagesPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useBookingMessages } from "../../hooks/useBookingMessages";
import BookingMessagesSkeleton from "../../components/ui/loaders/BookingMessageSkeleton";

export default function BookingMessagesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookingId = Number(id);

  const { messages, loading, error } = useBookingMessages(bookingId);
  return (
    <div className="min-h-screen bg- flex flex-col mt-9">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4 z-10">
        <button
          onClick={() => navigate("/bookings")}
          className="text-primary hover:text-primary-700 transition"
        >
          <FiArrowLeft size={22} />
        </button>
        <div>
          <h2 className="font-semibold text-gray-800">
            Booking #{id} Messages
          </h2>
          <p className="text-sm text-gray-500">
            Conversation with property host
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="grow  px-6 py-6 space-y-4">
        {loading && <BookingMessagesSkeleton />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && messages.length === 0 && (
          <p className="text-center text-gray-400">No messages yet.</p>
        )}

        {messages?.map((msg) => {
          const time =
            msg.created_at && !Number.isNaN(new Date(msg.created_at).getTime())
              ? new Date(msg.created_at).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";
          const currentUserId = 1;
          const isOutgoing = msg.sender_id === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl rounded-tl-none text-sm shadow-sm ${
                  isOutgoing
                    ? "bg-primary text-white"
                    : "bg-white text-gray-800 border-2 border-primary"
                }`}
              >
                <p>{msg.message}</p>
                <span className="block text-[10px] mt-1 text-gray-400">
                  {time}
                </span>
                <span className="block text-[10px] mt-1 text-gray-500">
                  {msg.sender?.name ?? "Unknown"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
