"use client";

import { useEffect, useState } from "react";

interface Job {
  job_id: number;
  job_title: string;
  job_short_description: string;
  job_description: string;
  exp_required: string;
  no_of_positions: number;
  minimum_qualification: string;
  last_dateof_application: string;
}

interface FormData {
  name: string;
  phone: string;
  jobTitle: string;
  dob: string;
  aadhar: string;
  address: string;
  highestQualification: string;
  professionalQualification: string;
  photo: File | null;
  cv: File | null;
}

export default function JobOpenings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    jobTitle: "",
    dob: "",
    aadhar: "",
    address: "",
    highestQualification: "",
    professionalQualification: "",
    photo: null,
    cv: null,
  });

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch("https://njportal.thenoncoders.in/api/v1/get_joblist", {
        headers: {
          "Content-Type": "application/json",
         "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
        },
      });

      const data = await res.json();
      if (data.status) {
        setJobs(data.data);
      } else {
        console.error("Failed to fetch jobs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  fetchJobs();
}, []);

  const handleOpenForm = (jobTitle: string) => {
    setFormData({ ...formData, jobTitle });
    setIsOpen(true);
    setCurrentStep(1);
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    alert("Form Submitted!");
    setIsOpen(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000]">Current Job Openings</h2>
      </div>

      {/* ✅ Job Cards (Dynamic from API) */}
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] flex flex-col"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4">{job.job_title}</h3>
              <p className="text-gray-500 text-sm mb-3">
                <span className="font-semibold">Description:</span> {job.job_description}</p>
              <p className="text-gray-500 text-sm mb-3">
                <span className="font-semibold">Qualification:</span> {job.minimum_qualification}
              </p>
               <p className="text-gray-500 text-sm mb-3">
                <span className="font-semibold">Experience</span> {job.exp_required}
              </p>
               <p className="text-gray-500 text-sm mb-3">
                <span className="font-semibold">No of positions</span> {job.no_of_positions}
              </p>
               <p className="text-gray-500 text-sm mb-5">
                <span className="font-semibold">Last Date</span> {job.last_dateof_application}
              </p>
              <div>
                <button
                  onClick={() => handleOpenForm(job.job_title)}
                  className="mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all"
                >
                  Apply →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500">Loading jobs...</p>
        )}
      </div>

      {/* ✅ Keep your existing modal form below (no changes needed) */}
      {isOpen && (
        // your existing modal JSX here
        <div className="fixed inset-0 bg-[#00000096] bg-opacity-20 flex items-center justify-center z-50">
          {/* form content (same as before) */}
        </div>
      )}
    </section>
  );
}
