"use client";

import { useState } from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  qualification: string;
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
  const [jobs] = useState<Job[]>([
    { id: 1, title: "Frontend Developer", description: "Build and maintain responsive web applications using React.", qualification: "Bachelor’s in CS" },
    { id: 2, title: "Backend Developer", description: "Work on APIs and database integration using Node.js or Laravel.", qualification: "Experience with REST APIs" },
    { id: 3, title: "SEO", description: "Work on APIs and database integration using Node.js or Laravel.", qualification: "Experience with REST APIs" },
    { id: 4, title: "Ad Expert", description: "Work on APIs and database integration using Node.js or Laravel.", qualification: "Experience with REST APIs" },
  ]);

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

      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] flex flex-col">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{job.title}</h3>
            <p className="text-gray-700 text-sm mb-2">{job.description}</p>
            <p className="text-gray-500 text-sm mb-4"><span className="font-semibold">Qualification:</span> {job.qualification}</p>
            <div>
            <button onClick={() => handleOpenForm(job.title)} className="mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all">
              Apply →
            </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#00000096] bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6  relative">
            <h2 className="text-2xl font-bold mb-6 text-center">Application Form</h2>

            {/* Step Indicators */}
            <div className="flex justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === step ? "bg-blue-600 text-white" : step < currentStep ? "bg-blue-400 text-white" : "bg-orange-400 text-white"}`}>
                  {step}
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="text" name="jobTitle" value={formData.jobTitle} readOnly className="w-full border p-2 rounded bg-gray-100" />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <input type="text" name="aadhar" placeholder="Aadhar Number" value={formData.aadhar} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
                <select name="highestQualification" value={formData.highestQualification} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="">Highest Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor’s">Bachelor’s</option>
                  <option value="Master’s">Master’s</option>
                </select>
                <select name="professionalQualification" value={formData.professionalQualification} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="">Professional Qualification</option>
                  <option value="React">React</option>
                  <option value="Node.js">Node.js</option>
                  <option value="Laravel">Laravel</option>
                </select>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Upload Photo</label>
                  <input type="file" name="photo" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block mb-1">Upload CV</label>
                  <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full border p-2 rounded" />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && <button onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded">Previous</button>}
              {currentStep < 3 && <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>}
              {currentStep === 3 && <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>}
            </div>

            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold">X</button>
          </div>
        </div>
      )}
    </section>
  );
}
