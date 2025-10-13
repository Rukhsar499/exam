"use client";

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        
        <input
          type="email"
          className="w-full mt-1 px-3 py-2 text-sm  border-b border-[#0000008a]  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        
        <input
          type="password"
          className="w-full mt-1 px-3 py-2 border-b border-[#0000008a]r text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>

       <div className="text-center">
            <button type="submit" className="mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all">
              Login →
            </button>
            </div>
    </form>
  );
}
