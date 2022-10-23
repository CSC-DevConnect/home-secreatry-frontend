import React from "react";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <div className="px-10 py-4">
      <Navbar />
      <div className="grid grid-cols-3 gap-4 px-4 py-6">
        <div className="basis-1/4 bg-blue-600 rounded-md h-2"></div>
        <div className="basis-1/4 bg-[#D8E5FF] px-5 rounded-md h-2"></div>
        <div className="basis-1/4 bg-[#D8E5FF] px-5 rounded-md h-2"></div>
      </div>
    </div>
  );
};
