"use client";

export default function RecruitmentTimeline() {
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
    <section className="py-16 bg-white mb-[50px]">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000] pb-[50px]">
          Recruitment Process
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative container mx-auto px-6">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 hidden md:block"></div>

        {/* Circles */}
        <div className="flex flex-wrap justify-between items-center md:space-x-0 relative z-10 mb-[50px] mt-[70px]">
          {steps.map((text, index) => {
            const isEven = index % 2 === 0;
            const circleColor = isEven ? "#1A7EBD" : "#ED7900";

            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center w-1/2 sm:w-1/4 md:w-auto mb-16 md:mb-0"
              >
                {/* 🔹 Small vertical line connecting circle and horizontal line */}
                {isEven ? (
                  // Blue circle BELOW horizontal line
                  <div className="absolute top-1/2 w-[2px] h-10 bg-gray-300"></div>
                ) : (
                  // Orange circle ABOVE horizontal line
                  <div className="absolute bottom-1/2 w-[2px] h-10 bg-gray-300"></div>
                )}

                {/* Circle with text */}
                <div
                  className="w-20 h-20 md:w-30 md:h-30 px-4 flex items-center justify-center rounded-full text-white font-medium  md:text-base shadow-md transition-transform duration-300 hover:scale-105 text-[14px]"
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
      </div>
    </section>
  );
}
