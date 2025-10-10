"use client";

import { BookOpen, Users, GraduationCap, Award } from "lucide-react"; // icons

export default function WhyChoose() {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12 mx-auto mb-3 text-white" />,
      title: "Comprehensive Study Material",
      color: "bg-blue-700",
    },
    {
      icon: <GraduationCap className="w-12 h-12 mx-auto mb-3 text-white" />,
      title: "Best Integrated Teaching",
      color: "bg-orange-500",
    },
    {
      icon: <Users className="w-12 h-12 mx-auto mb-3 text-white" />,
      title: "Experienced Faculty",
      color: "bg-blue-700",
    },
    {
      icon: <Award className="w-12 h-12 mx-auto mb-3 text-white" />,
      title: "Scholarship Through N-ACST",
      color: "bg-orange-500",
    },
    {
      icon: <Award className="w-12 h-12 mx-auto mb-3 text-white" />,
      title: "Scholarship Through N-ACST",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10 px-4">
        <p className="text-orange-500 font-semibold uppercase tracking-wide">
          Always Choose The Best
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Why Choose Narayana Coaching
        </h2>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className={`${item.color} text-white rounded-lg shadow-md py-10 px-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105`}
          >
            {item.icon}
            <h3 className="text-lg font-semibold leading-snug">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
