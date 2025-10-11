"use client";

export default function RecruitmentTimeline() {
  const steps = [
    "Application",
    "Resume Shortlisting",
    "Aptitude Test",
    "Technical Interview",
    "HR Interview",
    "Offer Letter",
    "Onboarding",
    "Training",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Recruitment Process
        </h2>
        <p className="text-gray-600 mt-2">
          Our structured 8-step recruitment journey
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative container mx-auto px-6">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-300 hidden md:block"></div>

        {/* Circles */}
        <div className="flex flex-wrap justify-between items-center md:space-x-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center text-center w-1/2 sm:w-1/3 md:w-1/8 flex-shrink-0 mb-10 md:mb-0`}
            >
              {/* Connector line for small screens */}
              {index !== 0 && (
                <div className="absolute top-[50%] left-[-50%] w-[100%] h-[2px] bg-gray-300 md:hidden"></div>
              )}

              {/* Circle */}
              <div
                className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full text-white font-semibold text-sm md:text-base shadow-md transition-transform duration-300 hover:scale-105 ${
                  index % 2 === 0
                    ? "bg-[#1A7EBD] md:-translate-y-10"
                    : "bg-[#ED7900] md:translate-y-10"
                }`}
              >
                Step {index + 1}
              </div>

              {/* Step Label */}
              <p className="mt-4 text-gray-800 font-medium text-sm md:text-base max-w-[100px] md:max-w-[120px]">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
