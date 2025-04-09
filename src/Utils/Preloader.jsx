// components/Preloader.jsx
import { ClipLoader } from "react-spinners";
import logo from "../assets/logo.png";
import { useEffect } from "react";

export default function Preloader() {
  useEffect(() => {
    // Add overflow-hidden to body when component mounts
    document.body.classList.add("overflow-y-hidden");
    
    // Cleanup function to remove it when component unmounts
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] gap-4">
      <img src={logo} alt="Logo" className="w-32 animate-pulse" />
      {/* Optional: Add spinner below logo */}
      {/* <ClipLoader 
        color="#3B82F6" 
        size={50} 
        className="mt-4"
      /> */}
    </div>
  );
}