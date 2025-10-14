"use client";

export default function StickyFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#1A7EBD] text-white py-4 shadow-md z-50 md:hidden">
  <div className="container mx-auto px-6 flex justify-center items-center text-center space-x-2">
    <span className="font-medium cursor-pointer">New Job Opening</span>
    
  </div>
</footer>
  );
}