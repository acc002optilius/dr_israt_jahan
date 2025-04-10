import React from "react";
import { api } from "../../Api/Api";
import defaultDoctorImg from "../../assets/Doctor/defaultDoctorImg.jpg";
import MinTitle from "../Title/MinTitle";
import { useSelector } from "react-redux";
// If using react-icons (recommended)
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const DoctorCard = ({
  firstName,
  lastName,
  doctorId,
  department,
  socialNetworks = {},
  image,

  key,
}) => {


  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );


//   Handle Go Single Doctor
const handleSingleDoctor = (id) => {
    console.log(id);
    
}
  // Get translated department name
  const getTranslatedDepartmentName = () => {
    if (department?.translations && selectedLanguage?.lang_code) {
      const translation = department.translations.find(
        (trans) => trans.lang_code === selectedLanguage.lang_code
      );
      return translation?.name || department.name;
    }
    return department?.name || "";
  };

  // Social media icons configuration
  const socialIcons = {
    facebook: { icon: <FaFacebook />, color: "text-blue-600" },
    instagram: { icon: <FaInstagram />, color: "text-pink-600" },
    linkedin: { icon: <FaLinkedin />, color: "text-blue-500" },
    x: { icon: <FaXTwitter />, color: "text-black" },
  };

  return (
    <div
      key={key}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      {/* Image with overlay effect */}
      <div className="relative aspect-square flex-1 overflow-hidden">
        <img
          src={image ? `${api}/${image}` : defaultDoctorImg}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Color overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-color)] to-transparent opacity-0 group-hover:opacity-[0.6]  transition-opacity duration-300"></div>

        {/* Social buttons (shown on hover) */}
        <div className="absolute inset-0 flex items-end pb-4 justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/30">
          {Object.entries(socialIcons).map(([platform, { icon, color }]) => {
            const url = socialNetworks?.[platform] || "#";

            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-secondary  p-2 rounded-full hover:bg-[#eee] transition-all  border-[1px] border-transparent hover:border-theme duration-300 ${
                  color || "text-theme"
                }`}
                aria-label={platform}
              >
                {icon || platform.charAt(0).toUpperCase()}
              </a>
            );
          })}
        </div>
      </div>

      {/* Doctor info */}
      <div onClick={() => handleSingleDoctor(doctorId)} className="bg-theme border-t-[1px] border-theme group-hover:border-secondary p-4 text-center flex-none duration-500 cursor-pointer">
        <MinTitle
          className="text-secondary font-bold text-lg"
          text={`${firstName} ${lastName}`.length > 15 ? `${firstName} ${lastName}`.slice(0, 20) + "..." : `${firstName} ${lastName}`}
        />
        <MinTitle
          className="text-secondary"
          text={getTranslatedDepartmentName().length > 20 ? getTranslatedDepartmentName().slice(0, 30) + "..." : getTranslatedDepartmentName()}
        />
      </div>
    </div>
  );
};

export default DoctorCard;
