"use client";

import { useState } from "react";

interface JobData {
  title: string;
  description: string;
  qualification: string;
  ageLimit: string;
  lastDate: string;
  applyLink: string;
}

const ApplyPage = () => {
  const tabs = [
    "Primary Teacher",
    "Senior Teacher",
    "Teacher-in-Charge",
    "Assistant Teacher",
    "Head Teacher",
  ];

  const [activeTab, setActiveTab] = useState("Primary Teacher");

  const data: Record<string, JobData> = {
    "Primary Teacher": {
      title: "Primary Teacher Recruitment 2025",
      description:
        "The Primary Teacher position involves teaching students in grades 1–5, focusing on foundational learning in core subjects such as Mathematics, Science, and English. Teachers are expected to develop lesson plans, conduct classroom activities, and assess student progress.",
      qualification:
        "Bachelor’s Degree in Education (B.Ed) or equivalent with minimum 50% marks from a recognized university.",
      ageLimit: "Minimum 21 years and Maximum 35 years as on 01/01/2025.",
      lastDate: "10 November 2025",
      applyLink: "#",
    },
    "Senior Teacher": {
      title: "Senior Teacher Recruitment 2025",
      description:
        "Senior Teachers are responsible for teaching students of grades 9–12 and guiding them in advanced subjects. They must manage classrooms, prepare study materials, and participate in academic development programs.",
      qualification:
        "Postgraduate degree in relevant subject with B.Ed or equivalent teaching qualification.",
      ageLimit: "Minimum 23 years and Maximum 40 years as on 01/01/2025.",
      lastDate: "12 November 2025",
      applyLink: "#",
    },
    "Teacher-in-Charge": {
      title: "Teacher-in-Charge Vacancy 2025",
      description:
        "The Teacher-in-Charge oversees academic coordination, manages other teaching staff, and ensures smooth conduct of school operations. They are responsible for implementing educational standards and maintaining discipline.",
      qualification:
        "Master’s Degree in Education or equivalent with at least 5 years of teaching experience.",
      ageLimit: "Minimum 28 years and Maximum 45 years as on 01/01/2025.",
      lastDate: "15 November 2025",
      applyLink: "#",
    },
    "Assistant Teacher": {
      title: "Assistant Teacher Vacancy 2025",
      description:
        "Assistant Teachers support the main teacher in preparing lesson plans, organizing classroom materials, and managing student activities. They play a key role in maintaining an engaging learning environment.",
      qualification:
        "Graduation with D.El.Ed or equivalent diploma in elementary education.",
      ageLimit: "Minimum 21 years and Maximum 32 years as on 01/01/2025.",
      lastDate: "20 November 2025",
      applyLink: "#",
    },
    "Head Teacher": {
      title: "Head Teacher Recruitment 2025",
      description:
        "Head Teachers lead the school’s teaching team, plan academic schedules, and ensure the highest standards of education. They must supervise teachers, evaluate performance, and represent the school in administrative meetings.",
      qualification:
        "Postgraduate degree with B.Ed and minimum 8 years of teaching experience.",
      ageLimit: "Minimum 30 years and Maximum 50 years as on 01/01/2025.",
      lastDate: "25 November 2025",
      applyLink: "#",
    },
  };

  const job = data[activeTab];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Apply for Teaching Posts
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              activeTab === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job Details Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-800">
          <div>
            <strong>Qualification Required:</strong>
            <p className="mt-1 text-gray-600">{job.qualification}</p>
          </div>
          <div>
            <strong>Age Limit:</strong>
            <p className="mt-1 text-gray-600">{job.ageLimit}</p>
          </div>
          <div>
            <strong>Last Date to Apply:</strong>
            <p className="mt-1 text-gray-600">{job.lastDate}</p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href={job.applyLink}
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
