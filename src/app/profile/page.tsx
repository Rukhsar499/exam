"use client";

import { useState } from "react";

type Job = {
id: number;
title: string;
applicationStatus: "Yes" | "No";
selectionStatus: string;
feedback: string;
admitCardUrl?: string;
};

export default function ProfilePage() {
const [openJobId, setOpenJobId] = useState<number | null>(null);

const jobs: Job[] = [
{
id: 1,
title: "Mathematics Teacher",
applicationStatus: "Yes",
selectionStatus: "Shortlisted",
feedback: "Interview scheduled for 3rd Nov 2025.",
admitCardUrl: "#",
},
{
id: 2,
title: "Science Trainer",
applicationStatus: "No",
selectionStatus: "Pending",
feedback: "Application under review.",
},
];

return ( <div className="min-h-screen bg-gray-50 p-6">
{/* Profile Info */} <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 mb-8"> <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6"> <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200"> <img
           src="https://i.pravatar.cc/150?img=12"
           alt="Profile"
           className="w-full h-full object-cover"
         /> </div> <div> <h2 className="text-2xl font-semibold">Asha Sharma</h2> <p className="text-gray-600">Senior Teacher Trainer</p> <p className="text-gray-500 text-sm mt-1">New Delhi, India</p> <div className="mt-3 space-y-1 text-sm text-gray-700"> <p> <strong>Email:</strong> [asha.sharma@example.com](mailto:asha.sharma@example.com) </p> <p> <strong>Phone:</strong> +91 98765 43210 </p> <p> <strong>Department:</strong> Mathematics </p> </div> </div> </div>

    <div className="mt-5 border-t pt-4">
      <h3 className="font-semibold text-lg mb-2">About</h3>
      <p className="text-gray-700 text-sm leading-relaxed">
        Passionate educator with 8+ years of experience in teacher training,
        curriculum design, and professional development workshops.
      </p>
    </div>
  </div>

  {/* Applied Jobs */}
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-semibold mb-4">Applied Jobs</h3>

    {jobs.map((job) => (
      <div key={job.id} className="border rounded mb-3 overflow-hidden">
        <button
          onClick={() =>
            setOpenJobId(openJobId === job.id ? null : job.id)
          }
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
        >
          <span className="font-medium">{job.title}</span>
          <span
            className={`transform transition-transform ${
              openJobId === job.id ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </button>

        {openJobId === job.id && (
          <div className="px-4 py-3 border-t bg-white text-sm space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Application Status:</span>
              {job.applicationStatus === "Yes" ? (
                <span className="text-green-600 font-semibold">Yes</span>
              ) : (
                <span className="text-red-600 font-semibold">No</span>
              )}
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Selection Status:</span>
              <span>{job.selectionStatus}</span>
            </div>

            <div>
              <span className="font-medium block">Feedback:</span>
              <p className="text-gray-700 mt-1">{job.feedback}</p>
            </div>

            {job.admitCardUrl && (
              <div className="text-right">
                <a
                  href={job.admitCardUrl}
                  target="_blank"
                  className="inline-block px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Download Admit Card
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
</div>

);
}
