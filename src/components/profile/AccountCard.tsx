// src/components/profile/AccountCard.tsx
import React from "react";

type Props = {
  user: any;
  initials: string;
  onLogout: () => void;
};

const AccountCard: React.FC<Props> = ({ user, initials, onLogout }) => {
  return (
    <section className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-start gap-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-semibold text-primary">
          {initials}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-primary">{user.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>

            {("id" in user || "created_at" in user) && (
              <div className="mt-2 text-xs text-gray-400">
                {"id" in user && (
                  <span className="mr-3">ID: {(user as any).id}</span>
                )}
                {"created_at" in user && (
                  <span>
                    Joined:{" "}
                    {new Date((user as any).created_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <button
              onClick={onLogout}
              className="px-4 py-2  bg-primary text-white text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountCard;
