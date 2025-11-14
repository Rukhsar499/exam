"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useUser();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowPopup(true); // show popup

      setTimeout(() => {
        router.push("/"); // redirect after 2 seconds
      }, 2000);
    }
  }, [user, router]);

  if (!user) {
    return (
      <>
        {/* Popup Overlay */}
        {showPopup && (
          <div className="fixed inset-0 bg-[#00000091] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg p-6 w-[300px] text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Access Denied
              </h2>
              <p className="text-gray-600 mt-2">
                Please register your email ID to access this page.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}
