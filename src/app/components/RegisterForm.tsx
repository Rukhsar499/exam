"use client";

export default function RegisterForm() {
  return (
    <form className="space-y-4">
      <div>
       
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 text-sm  border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
        />
      </div>

      <div>
       
        <input
          type="email"
          className="w-full mt-1 px-3 py-2 text-sm  border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email Address"
        />
      </div>

      <div>
       
        <input
          type="tel"
          className="w-full mt-1 px-3 py-2 text-sm  border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone Number"
        />
      </div>

      <div>
        
        <input
          type="password"
          className="w-full mt-1 px-3 py-2 text-sm  border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create Password"
        />
      </div>

      <div className="text-center">
            <button type="submit" className="mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all">
              Register →
            </button>
            </div>
    </form>
  );
}
