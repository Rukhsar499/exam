"use client";

export default function RegisterForm() {
  return (
    <form className="space-y-4">
      <div>
       
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
        />
      </div>

      <div>
       
        <input
          type="email"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email Address"
        />
      </div>

      <div>
       
        <input
          type="tel"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone Number"
        />
      </div>

      <div>
        
        <input
          type="password"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create Password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-all"
      >
        Register
      </button>
    </form>
  );
}
