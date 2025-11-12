"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";


interface UserProfile {
  userid?: string;
  referby: string;
  full_name: string;
  mobileno: string;
  emailid: string;
  dob: string;
  aadharnumber: string;
  applicant_address: string;
  highest_qualification: string;
  professional_qualification: string;
  teaching_exp: string;
  relative_working: string;
  relative_name: string;
  relative_number: string;
  city_name: string;
  stateid: string;
  pincode: string;
  fileimg?: string;
  file?: string;
}

const STATIC_STATES = [
  { id: "1", name: "Uttar Pradesh" },
  { id: "2", name: "Delhi" },
  { id: "3", name: "Maharashtra" },
  { id: "4", name: "Karnataka" },
  { id: "5", name: "Tamil Nadu" },
];

export default function ProfilePage() {
  
  const [user, setUser] = useState<UserProfile>({
    userid: "1",
    referby: "INT",
    full_name: "",
    mobileno: "",
    emailid: "",
    dob: "",
    aadharnumber: "",
    applicant_address: "",
    highest_qualification: "",
    professional_qualification: "",
    teaching_exp: "",
    relative_working: "",
    relative_name: "",
    relative_number: "",
    city_name: "",
    stateid: "",
    pincode: "",
  });

  // Local Storage se data load karne ke liye
useEffect(() => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedData = localStorage.getItem("user_info");

    if (storedData) {
      const userInfo = JSON.parse(storedData);
      setUser((prev) => ({
        ...prev,
        full_name: userInfo.name || prev.full_name,
        mobileno: userInfo.mobile_no || prev.mobileno,
        emailid: userInfo.email || prev.emailid,
        userid: userInfo.user_id || prev.userid,
      }));
    }
  }
}, []); 

  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // files & previews
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Optional: fetch profile to prefill (uncomment or keep)
  useEffect(() => {
    if (!user.userid || user.userid === "1") {
    console.log("Waiting for actual user ID from localStorage...");
    return;
  }
    async function fetchProfile() {
      try {
        const url = `https://njportal.thenoncoders.in/api/v1/get_myprofile?userid=${encodeURIComponent(
          user.userid || "1"
        )}`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
          },
        });

        if (!res.ok) return; // ignore if fails
        const payload = await res.json();
        const data = payload?.data ?? payload;

        // set only known fields from response
        const allowed: (keyof UserProfile)[] = [
          "referby",
          "full_name",
          "mobileno",
          "emailid",
          "dob",
          "aadharnumber",
          "applicant_address",
          "highest_qualification",
          "professional_qualification",
          "teaching_exp",
          "relative_working",
          "relative_name",
          "relative_number",
          "city_name",
          "stateid",
          "pincode",
          "fileimg",
          "file",
        ];

        const patched: Partial<UserProfile> = {};
        allowed.forEach((k) => {
          if (data?.[k] !== undefined && data?.[k] !== null) patched[k] = String(data[k]);
        });

        setUser((prev) => ({ ...prev, ...patched }));
      } catch (err) {
        console.error("get_myprofile error:", err);
      }
    }

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // cleanup preview URL on change/unmount
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
  };

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setPhotoFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleCv = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setCvFile(f);
  };

  // client-side validation
  const validate = (): string | null => {
    const required: (keyof UserProfile)[] = [
      "full_name",
      "mobileno",
      "emailid",
      "dob",
      "aadharnumber",
      "applicant_address",
      "highest_qualification",
      "professional_qualification",
      "teaching_exp",
      "relative_working",
      "relative_name",
      "relative_number",
      "city_name",
      "stateid",
      "pincode",
      "referby",
    ];

    for (const k of required) {
      if (!String((user as any)[k] ?? "").trim()) return `${k.replace(/_/g, " ")} is required`;
    }

    if (!photoFile && !user.fileimg) return "Please select profile photo";
    if (!cvFile && !user.file) return "Please select CV file";

    if (!/^\d{10}$/.test(user.mobileno)) return "Mobile must be 10 digits";
    if (!/^\S+@\S+\.\S+$/.test(user.emailid)) return "Enter a valid email";

    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      alert(v);
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();

      // append fields
      Object.entries(user).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v));
      });

      if (photoFile) fd.append("fileimg", photoFile);
      if (cvFile) fd.append("file", cvFile);

      const res = await fetch("https://njportal.thenoncoders.in/api/v1/update_profile", {
        method: "POST",
        headers: {
          // DO NOT set Content-Type (browser sets boundary for FormData)
          "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
        },
        body: fd,
      });

      if (res.status === 401) {
        alert("Unauthorized (401). Check your x-api-key.");
        setLoading(false);
        return;
      }

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("update_profile failed", payload);
        alert("Update failed: " + (payload?.message ?? res.statusText));
        setLoading(false);
        return;
      }

      alert("Profile updated successfully!");
      if (payload?.data) setUser((p) => ({ ...p, ...payload.data }));
      setIsEditing(false);
    } catch (err) {
      console.error("submit error:", err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // UI helpers
  const inputBase =
    "w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* header */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Candidate Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Fill your details — all fields are required</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  // reset previews if cancel editing
                  setPhotoFile(null);
                  setCvFile(null);
                  setPhotoPreview(user.fileimg ?? null);
                }
                setIsEditing((s) => !s);
              }}
              className="px-4 py-2 rounded-lg bg-white border shadow hover:shadow-md text-indigo-700"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>

            {isEditing && (
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>

        {/* body */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* left: visual + uploads */}
          <div className="col-span-1 flex flex-col items-center gap-6">
            <div className="w-40 h-40 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border border-gray-200">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
              ) : user.fileimg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.fileimg} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center px-3">
                  <div className="text-sm font-medium text-indigo-700">No Photo</div>
                  <div className="text-xs text-gray-400">Upload to preview</div>
                </div>
              )}
            </div>

            <label className="w-full">
              <div className="text-sm font-medium text-gray-700 mb-2">Profile Photo *</div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                disabled={!isEditing}
                required={!user.fileimg && !photoFile}
                className="w-full text-sm text-gray-600"
              />
            </label>

            <div className="w-full">
              <div className="text-sm font-medium text-gray-700 mb-2">CV Upload *</div>
              <div className="flex items-center gap-3">
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCv}
                    disabled={!isEditing}
                    required={!user.file && !cvFile}
                    className="w-full text-sm text-gray-600"
                  />
                </label>
                <div className="text-xs text-gray-500">
                  {cvFile ? cvFile.name : user.file ? extractFilename(user.file) : "No file"}
                </div>
              </div>
            </div>
          </div>

          {/* right: form fields two-column grid across 2/3 width */}
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Refer By *</label>
                <input
                  name="referby"
                  value={user.referby}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  name="full_name"
                  value={user.full_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                <input
                  name="mobileno"
                  value={user.mobileno}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  inputMode="numeric"
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email ID *</label>
                <input
                  name="emailid"
                  value={user.emailid}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  type="email"
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                <input
                  name="dob"
                  value={user.dob}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  type="date"
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Aadhar Number *</label>
                <input
                  name="aadharnumber"
                  value={user.aadharnumber}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={inputBase}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address *</label>
                <textarea
                  name="applicant_address"
                  value={user.applicant_address}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  rows={3}
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Highest Qualification *</label>
                <input
                  name="highest_qualification"
                  value={user.highest_qualification}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Qualification *</label>
                <input
                  name="professional_qualification"
                  value={user.professional_qualification}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Teaching Experience *</label>
                <input
                  name="teaching_exp"
                  value={user.teaching_exp}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">City *</label>
                <input
                  name="city_name"
                  value={user.city_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={inputBase}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">State *</label>
                  <select
                    name="stateid"
                    value={user.stateid}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className={inputBase}
                  >
                    <option value="">Select State</option>
                    {STATIC_STATES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pincode *</label>
                  <input
                    name="pincode"
                    value={user.pincode}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    required
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Relative Working *</label>
                  <input
                    name="relative_working"
                    value={user.relative_working}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    required
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Relative Name *</label>
                  <input
                    name="relative_name"
                    value={user.relative_name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    required
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Relative Number *</label>
                  <input
                    name="relative_number"
                    value={user.relative_number}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    required
                    className={inputBase}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ---------- Helpers ---------- */

function extractFilename(url?: string) {
  if (!url) return "";
  try {
    const parts = url.split("/");
    return parts[parts.length - 1];
  } catch {
    return url;
  }
}
