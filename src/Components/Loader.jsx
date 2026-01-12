import { Package } from "lucide-react";

// Full page loader
export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#CBDCBD] rounded-2xl flex items-center justify-center animate-pulse mb-4 mx-auto">
          <Package className="w-10 h-10 text-[#063A3A] animate-bounce" />
        </div>
        <p className="text-lg font-semibold text-[#06393a]">Loading...</p>
      </div>
    </div>
  );
}

// Simple inline loader (for components)
export function SimpleLoader({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#06393a] mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-[#06393a]">{message}</p>
      </div>
    </div>
  );
}

// Mini loader (for small sections)
export function MiniLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06393a]"></div>
    </div>
  );
}
