"use client";

import { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  qualification: string;
}

export default function JobOpenings() {
  // 🔹 Dummy data (later replace with API data)
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Frontend Developer",
      description: "Build and maintain responsive web applications using React.",
      qualification: "Bachelor’s in Computer Science or related field",
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Work on APIs and database integration using Node.js or Laravel.",
      qualification: "Experience with REST APIs and SQL/NoSQL databases",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      description: "Design intuitive user interfaces and improve user experience.",
      qualification: "Knowledge of Figma or Adobe XD tools",
    },
    {
      id: 4,
      title: "Project Manager",
      description: "Manage project timelines, tasks, and client communication.",
      qualification: "Strong communication and organizational skills",
    },
  ]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Current Job Openings
        </h2>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-700 text-sm mb-2">{job.description}</p>
            <p className="text-gray-500 text-sm mb-4">
              <span className="font-semibold">Qualification:</span> {job.qualification}
            </p>
            <button className="mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all">
              Apply →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
