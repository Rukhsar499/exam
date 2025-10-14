"use client";
import React from "react";

export default function RecruitmentProcess() {
  const steps = [
    "Apply Online",
    "CV Shortlisting",
    "Take Aptitude Test",
    "Technical Interview",
    "HR Discussion",
    "Offer Issued",
    "Join Company",
    "Training Started",
  ];

  return (
    <section className="md:py-16 py-10 bg-white md:mb-[50px]">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000] md:pb-[50px] ">
          Recruitment Process
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative container mx-auto px-6">
        {/* Horizontal line for desktop */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 hidden md:block"></div>

        {/* Desktop Circles */}
        <div className="hidden md:flex justify-between items-center relative z-10 mb-[50px] mt-[70px]">
          {steps.map((text, index) => {
            const isEven = index % 2 === 0;
            const circleColor = isEven ? "#1A7EBD" : "#ED7900";

            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center w-auto mb-0"
              >
                {/* Vertical line */}
                {isEven ? (
                  <div className="absolute top-1/2 w-[2px] h-10 bg-gray-300"></div>
                ) : (
                  <div className="absolute bottom-1/2 w-[2px] h-10 bg-gray-300"></div>
                )}

                <div
                  className="w-30 h-30 px-4 flex items-center justify-center rounded-full text-white font-medium text-base shadow-md transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundColor: circleColor,
                    transform: isEven ? "translateY(70%)" : "translateY(-70%)",
                  }}
                >
                  {text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Circles (2 side by side with arrow) */}
        <div className="flex flex-col md:hidden gap-6">
           {steps.reduce((acc: React.ReactNode[], step, index) => {
            if (index % 2 === 0) {
              const nextStep = steps[index + 1];
              acc.push(
                <div key={index} className="flex items-center justify-center gap-4">
                  {/* Blue circle */}
                  <div
                    className="w-30 h-30 flex items-center justify-center text-center rounded-full text-white font-medium shadow-md text-[16px] p-4"
                    style={{ backgroundColor: "#1A7EBD" }}
                  >
                    {step}
                  </div>

                  {/* Right arrow if next step exists */}
                  {nextStep && (
            <span className="text-gray-400 text-xl font-bold">→</span>
          )}

                  {/* Orange circle */}
                  {nextStep && (
                    <div
                      className="w-30 h-30 flex items-center justify-center text-center rounded-full text-white font-medium shadow-md text-[16px] p-4"
                      style={{ backgroundColor: "#ED7900" }}
                    >
                      {nextStep}
                    </div>
                  )}
                </div>
              );
            }
            return acc;
          }, [])}
        </div>
      </div>
    </section>
  );
}
