import React from "react";
import { Package } from "lucide-react";

export default function Loader() {
  return (
    <div className="
      fixed inset-0 
      flex items-center justify-center 
      bg-white 
      z-50
    ">
      <div className="w-16 h-16 bg-[#CBDCBD] rounded-2xl flex items-center justify-center animate-pulse">
        <Package className="w-8 h-8 text-[#063A3A]" />
      </div>
    </div>
  );
}
