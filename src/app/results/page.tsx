"use client";

import { useState } from "react";

interface ResultData {
  date: string;
  examName: string;
  writeUp: string;
  result: string;
  marks: string;
}

const ResultPage = () => {
  const tabs = [
    "Teacher",
    "Senior Teacher",
    "Primary Teacher",
    "Teacher-in-Charge",
    "Assistant Teacher",
  ];

  const [activeTab, setActiveTab] = useState("Teacher");

  // Example data for each tab
  const data: Record<string, ResultData[]> = {
    Teacher: [
      {
        date: "06-12-2023",
        examName:
          "Combined Graduate Level Examination, 2023 (Revised Final Result)",
        writeUp: "/pdfs/writeup.pdf",
        result: "/pdfs/result.pdf",
        marks: "/pdfs/marks.pdf",
      },
    ],
    "Senior Teacher": [
      {
        date: "08-02-2024",
        examName:
          "Senior Teacher Eligibility Test, 2024 (Final List of Qualified Candidates)",
        writeUp: "/pdfs/writeup.pdf",
        result: "/pdfs/result.pdf",
        marks: "/pdfs/marks.pdf",
      },
    ],
    "Primary Teacher": [
      {
        date: "15-03-2024",
        examName: "Primary Teacher Recruitment Examination, 2024",
        writeUp: "/pdfs/writeup.pdf",
        result: "/pdfs/result.pdf",
        marks: "/pdfs/marks.pdf",
      },
    ],
    "Teacher-in-Charge": [
      {
        date: "05-05-2024",
        examName:
          "Teacher-in-Charge Selection Test, 2024 (List of Shortlisted Candidates)",
        writeUp: "/pdfs/writeup.pdf",
        result: "/pdfs/result.pdf",
        marks: "/pdfs/marks.pdf",
      },
    ],
    "Assistant Teacher": [
      {
        date: "25-07-2024",
        examName: "Assistant Teacher Examination, 2024",
        writeUp: "/pdfs/writeup.pdf",
        result: "/pdfs/result.pdf",
        marks: "/pdfs/marks.pdf",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Examination Results
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

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white text-sm uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Uploaded Date</th>
              <th className="px-4 py-3 text-left">Examination Name and Year</th>
              <th className="px-4 py-3 text-left">Write Up</th>
              <th className="px-4 py-3 text-left">Result</th>
              <th className="px-4 py-3 text-left">Marks</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {data[activeTab]?.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.examName}</td>

                <td className="px-4 py-3">
                  <a
                    href={item.writeUp}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    click here (600.07 KB)
                  </a>
                </td>

                <td className="px-4 py-3">
                  <a
                    href={item.result}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    click here (79.69 KB)
                  </a>
                </td>

                <td className="px-4 py-3">
                  <a
                    href={item.marks}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    click here (50.21 KB)
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultPage;
