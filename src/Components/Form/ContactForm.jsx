import React, { useEffect, useRef, useState } from "react";
import MinTitle from "../../Layout/Title/MinTitle";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../Layout/Button/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdCalendarToday,
  MdSearch,
} from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "../../Layout/Input/InputLabel/InputLabel";
import UserAuthInput from "../../Layout/Input/UserAuthForm/UserAuthInput";
import { getTranslation } from "../../Utils/Translation/translationUtils";
const googleValSitekey = "6LesUa8qAAAAAPuU_Aied1IqtR9_8BIQ9EmYasye";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { makeAppointmentApi } from "../../Api/Api";

const ContactForm = ({ translations, doctorsList }) => {
  const staticPhoneCodes = [
    { name: "Bangladesh", phonecode: "880", iso2: "bd" },
    { name: "United States", phonecode: "1", iso2: "us" },
    { name: "United Kingdom", phonecode: "44", iso2: "gb" },
    { name: "Canada", phonecode: "1", iso2: "ca" },
    { name: "Australia", phonecode: "61", iso2: "au" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const [googleVal, setGoogleVal] = useState(null);

  // Calendar state and ref
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  // Doctor dropdown state
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState("");
  const dropdownDoctorRef = useRef(null);

  // Get current date in YYYY-MM-DD format (fixed timezone issue)
  const getCurrentDate = () => {
    const today = new Date();
    // Use UTC methods to avoid timezone issues
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, "0");
    const day = String(today.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneCode: "",
    email : "" ,
    message: "",
  });






  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setStatus("");
    setInputErrors({ ...inputErrors, [name]: "" });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        makeAppointmentApi,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phoneNumber,
          phonecode: formData.phoneCode,
          email: formData.email,
          message: formData.message,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);

      if (response.data.status === true) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          phoneCode: "",
          message: "",
        });
        setStatus({ message: response.data.message, type: true });
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        setStatus({ message: response.data.message, type: "error" });
      }
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors;
          setInputErrors({
            firstName: errorMessages.first_name
              ? errorMessages.first_name[0]
              : "",
            lastName: errorMessages.last_name
              ? errorMessages.last_name[0]
              : "",
            email: errorMessages.email ? errorMessages.email[0] : "",
            phoneNumber: errorMessages.phone ? errorMessages.phone[0] : "",
            message: errorMessages.message ? errorMessages.message[0] : "",
          });
          setStatus(null);
        } else {
          setStatus({ message: error.response.data.message, type: "error" });
        }
      } else {
        setStatus({
          message: "An error occurred. Please try again.",
          type: "error",
        });
      }
    }
  };

  // Phone code dropdown state
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [phoneCodes, setPhoneCodes] = useState(staticPhoneCodes);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState(
    staticPhoneCodes[0].phonecode
  );
  const [selectedFlag, setSelectedFlag] = useState(staticPhoneCodes[0].iso2);
  const dropdownPhoneRef = useRef(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, phoneCode: selectedCode }));
  }, [selectedCode]);

  const handlePhoneSelect = (code, iso2) => {
    setSelectedCode(code);
    setSelectedFlag(iso2);
    setIsPhoneDropdownOpen(false);
  };



  return (
    <div className="w-full">
      <MinTitle
        className={`pb-4 text-center font-medium ${
          status?.type === true ? "!text-green-500" : "!text-red-500"
        }`}
        text={status?.message || ""}
      />
      <div className="grid lg:grid-cols-2 gap-3 md:gap-4">
        {/* First Name */}
        <div>
          <UserAuthInput
            onChange={(name, value) => handleChange("firstName", value)}
            value={formData.firstName}
            type="text"
            placeholder={getTranslation(
                translations,
                selectedLanguage,
                "First_Name",
                "First Name"
              )}
            name="firstName"
            required="true"
          />
          {inputErrors.firstName && (
            <p className="text-red-500 text-xs pt-[2px]">
              {inputErrors.firstName}
            </p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <UserAuthInput
            onChange={(name, value) => handleChange("lastName", value)}
            value={formData.lastName}
            type="text"
            placeholder={getTranslation(
                translations,
                selectedLanguage,
                "Last_Name",
                "Last Name"
              )}
            name="lastName"
            required="true"
          />
          {inputErrors.lastName && (
            <p className="text-red-500 text-xs pt-[2px]">
              {inputErrors.lastName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <div className="flex items-center relative">
            <div className="flex items-center relative w-full">
              <div ref={dropdownPhoneRef}>
                <button
                  className="w-[100px] sm:w-[90px] flex items-center justify-between bg-secondary py-[10px] sm:py-3 md:py-3 px-2 rounded-l-md shadow-sm border-r-[1px] border-borderColor border-[1px] text-text-sm md:text-sm text-primary"
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                >
                  <div className="flex items-center gap-x-1 ">
                    <img
                      src={`https://flagcdn.com/w40/${selectedFlag.toLowerCase()}.png`}
                      alt={`${selectedFlag} flag`}
                      className="w-5 h-3  border-[1px] border-tertiary"
                    />
                    <p className="text-tertiary">+{selectedCode}</p>
                    <p className="text-tertiary pl-1 text-sm duration-500 transition-all">
                      {isPhoneDropdownOpen ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </p>
                  </div>
                </button>

                {isPhoneDropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border-[1px] border border-borderColor shadow-md mt-1 rounded-md z-[6]">
                    <input
                      type="text"
                      placeholder="Search country"
                      className="w-full p-2 border-b border-gray-300 outline-none"
                      value={phoneSearch}
                      onChange={(e) => setPhoneSearch(e.target.value)}
                    />
                    <div className="max-h-60 overflow-y-auto">
                      {phoneCodes
                        .filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(phoneSearch.toLowerCase())
                        )
                        .map((item) => (
                          <div
                            key={item.iso2}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handlePhoneSelect(item.phonecode, item.iso2)
                            }
                          >
                            <img
                              src={`https://flagcdn.com/w40/${item.iso2.toLowerCase()}.png`}
                              alt={`${item.name} flag`}
                              className="w-6 h-4"
                            />
                            <span>{item.name}</span>
                            <span className="ml-auto">+{item.phonecode}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              <UserAuthInput
                className="!rounded-l-none !text-left !pl-3  w-full"
                onChange={(name, value) => handleChange("phoneNumber", value)}
                value={formData.phoneNumber}
                type="number"
                placeholder={`${getTranslation(
                  translations,
                  selectedLanguage,
                  "Phone_Number",
                  "Phone Number"
                )}`}
                name="phoneNumber"
                required="true"
              />
            </div>
          </div>
          {inputErrors.phoneNumber && (
            <p className="text-red-500 text-xs pt-[2px]">
              {inputErrors.phoneNumber}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <UserAuthInput
            onChange={(name, value) => handleChange("email", value)}
            value={formData.email}
            type="text"
            placeholder={`${getTranslation(
              translations,
              selectedLanguage,
              "Email",
              "Email"
            )}`}
            name="email"
            required="true"
          />
          {inputErrors.email && (
            <p className="text-red-500 text-xs pt-[2px]">{inputErrors.email}</p>
          )}
        </div>



      </div>

      {/* Message Box */}
      <div className="mt-4">
        <textarea
          onChange={(e) => handleChange("message", e.target.value)}
          name="message"
          placeholder={getTranslation(
            translations,
            selectedLanguage,
            "Message_Input_Placeholder",
            "Describe your case or needs"
          )}
          rows="3"
          className="text-text-sm md:text-sm lg:text-sm w-full mt-1 lg:mt-2 rounded-md border-borderColor border-[1px] p-3 focus:!border-theme !ring-0 focus:!ring-0 focus:!outline-none"
          value={formData.message}
        ></textarea>
        {inputErrors.message && (
          <p className="text-red-500 text-xs pt-[2px]">{inputErrors.message}</p>
        )}
      </div>

      {/* Google Verification */}
      <div className="mt-4">
        <ReCAPTCHA
          sitekey={googleValSitekey}
          onChange={(googleVal) => setGoogleVal(googleVal)}
        />
      </div>

      {/* Submit Button */}
      <div className="inline-block">
        <SubmitButton
          className="w-full mt-4 md:mt-6 !border-none"
          onClick={handleSubmit}
          type="button"
          loadingTime="2000"
          text={getTranslation(
            translations,
            selectedLanguage,
            "Send_Message",
            "Send Message"
          )}
          disabled={!googleVal}
        />
      </div>
    </div>
  );
};

export default ContactForm;
