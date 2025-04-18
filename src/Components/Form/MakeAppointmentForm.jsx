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
  MdBookmarkAdd,
} from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "../../Layout/Input/InputLabel/InputLabel";
import UserAuthInput from "../../Layout/Input/UserAuthForm/UserAuthInput";
import { getTranslation } from "../../Utils/Translation/translationUtils";
const googleValSitekey = "6LesUa8qAAAAAPuU_Aied1IqtR9_8BIQ9EmYasye";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { allDoctorsApi, makeAppointmentApi } from "../../Api/Api";

const staticPhoneCodes = [
  { name: "Bangladesh", phonecode: "880", iso2: "bd" },
  { name: "United States", phonecode: "1", iso2: "us" },
  { name: "United Kingdom", phonecode: "44", iso2: "gb" },
  { name: "Canada", phonecode: "1", iso2: "ca" },
  { name: "Australia", phonecode: "61", iso2: "au" },
];
const MakeAppointmentForm = ({ translations, doctorId: initialDoctorId }) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const [googleVal, setGoogleVal] = useState(null);

  // All Doctor Api Fetch
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(allDoctorsApi);
      setDoctorsList(response.data?.data?.doctors || []);

      // If initial doctorId is provided, set the doctor search value
      if (initialDoctorId && response.data?.data?.doctors) {
        const initialDoctor = response.data.data.doctors.find(
          (d) => d.id === initialDoctorId || d.doctor_id === initialDoctorId
        );
        if (initialDoctor) {
          setDoctorSearch(
            `${initialDoctor.first_name} ${initialDoctor.last_name}`
          );
        }
      }
    };
    fetchData();
  }, [initialDoctorId]); // Add initialDoctorId as dependency
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
    patientName: "",
    age: "",
    appointmentDate: getCurrentDate(),
    phoneNumber: "",
    phoneCode: "",
    doctorId: initialDoctorId || "",
    gender: "",
    message: "",
  });

  // Format date for display (fixed timezone issue)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Use UTC methods to avoid timezone issues
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle date change (fixed timezone issue)
  const handleDateChange = (date) => {
    // Use UTC methods to ensure we get the correct date
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const formattedDate = utcDate.toISOString().split("T")[0];
    handleChange("appointmentDate", formattedDate);
    setShowCalendar(false);
  };

  // Handle click outside calendar
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setShowCalendar(false);
        }
      }
      if (
        dropdownDoctorRef.current &&
        !dropdownDoctorRef.current.contains(event.target)
      ) {
        setIsDoctorDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          first_name: formData.patientName,
          age: formData.age,
          appointment_date: formData.appointmentDate,
          phone: formData.phoneNumber,
          phonecode: formData.phoneCode,
          doctor_id: formData.doctorId,
          gender: formData.gender,
          message: formData.message,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);

      if (response.data.status === true) {
        setFormData({
          patientName: "",
          age: "",
          appointmentDate: getCurrentDate(),
          phoneNumber: "",
          phoneCode: "",
          doctorId: "",
          gender: "",
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
            patientName: errorMessages.patient_name
              ? errorMessages.patient_name[0]
              : "",
            age: errorMessages.age ? errorMessages.age[0] : "",
            appointmentDate: errorMessages.appointment_date
              ? errorMessages.appointment_date[0]
              : "",
            phoneNumber: errorMessages.phone ? errorMessages.phone[0] : "",
            doctorId: errorMessages.doctor_id ? errorMessages.doctor_id[0] : "",
            gender: errorMessages.gender ? errorMessages.gender[0] : "",
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
  const [selectedFlag, setSelectedFlag] = useState(staticPhoneCodes[0]?.iso2);
  const dropdownPhoneRef = useRef(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, phoneCode: selectedCode }));
  }, [selectedCode]);

  const handlePhoneSelect = (code, iso2) => {
    setSelectedCode(code);
    setSelectedFlag(iso2);
    setIsPhoneDropdownOpen(false);
  };

  // Filter doctors based on search
  const filteredDoctors = doctorsList
    ?.filter((doctor) => {
      const fullName = `${doctor.first_name} ${doctor.last_name}`.toLowerCase();
      return fullName.includes(doctorSearch.toLowerCase());
    })
    .slice(0, 8); // Show only first 8 doctors

  // Handle doctor selection
  const handleDoctorSelect = (doctorId, doctorName) => {
    handleChange("doctorId", doctorId);
    setIsDoctorDropdownOpen(false);
    setDoctorSearch(""); // Clear the search input after selection
  };

  // Get selected doctor name
  const selectedDoctorName = doctorsList?.find(
    (d) => d.id === formData.doctorId || d.doctor_id === formData.doctorId
  )
    ? `${
        doctorsList.find(
          (d) => d.id === formData.doctorId || d.doctor_id === formData.doctorId
        ).first_name
      } ${
        doctorsList.find(
          (d) => d.id === formData.doctorId || d.doctor_id === formData.doctorId
        ).last_name
      }`
    : getTranslation(
        translations,
        selectedLanguage,
        "Select_A_Doctor",
        "Select a Doctor"
      );

  return (
    <div className="w-full">
      <MinTitle
        className={`pb-4 text-center font-medium ${
          status?.type === true ? "!text-green-500" : "!text-red-500"
        }`}
        text={status?.message || ""}
      />
      <div className="grid lg:grid-cols-2 gap-2 md:gap-3">
        {/* Patient Name */}
        <div>
          <InputLabel
            text={getTranslation(
              translations,
              selectedLanguage,
              "Patient_Name",
              "Patient Name"
            )}
            required={true}
            className="pb-2"
          />
          <UserAuthInput
            onChange={(name, value) => handleChange("patientName", value)}
            value={formData.patientName}
            type="text"
            placeholder={`${getTranslation(
              translations,
              selectedLanguage,
              "Enter_Patient_Full_Name",
              "Enter Patient full name"
            )}`}
            name="patientName"
            required="true"
          />
          {inputErrors.patientName && (
            <p className="text-red-500 text-xs pt-[2px]">
              {inputErrors.patientName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <InputLabel
            text={getTranslation(
              translations,
              selectedLanguage,
              "Phone_Number",
              "Phone Number"
            )}
            required={true}
            className="pb-2"
          />
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
                            key={item?.iso2}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handlePhoneSelect(item.phonecode, item?.iso2)
                            }
                          >
                            <img
                              src={`https://flagcdn.com/w40/${item?.iso2.toLowerCase()}.png`}
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

        {/* Age */}
        <div>
          <InputLabel
            text={getTranslation(
              translations,
              selectedLanguage,
              "Patient_Age",
              "Patient Age"
            )}
            required={true}
            className="pb-2"
          />
          <UserAuthInput
            onChange={(name, value) => handleChange("age", value)}
            value={formData.age}
            type="text"
            placeholder={`${getTranslation(
              translations,
              selectedLanguage,
              "Enter_Patient_Age",
              "Enter Patient Age"
            )}`}
            name="age"
            required="true"
          />
          {inputErrors.age && (
            <p className="text-red-500 text-xs pt-[2px]">{inputErrors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <InputLabel
            text={getTranslation(
              translations,
              selectedLanguage,
              "Select_Gender",
              "Select Gender"
            )}
            required={true}
          />
          <select
            className="py-3 pr-[20px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-[1px] border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
            onChange={(e) => handleChange("gender", e.target.value)}
            value={formData.gender}
          >
            <option value="">
              {getTranslation(
                translations,
                selectedLanguage,
                "Select_Gender",
                "Select Gender"
              )}
            </option>
            <option value="1">
              {getTranslation(translations, selectedLanguage, "Male", "Male")}
            </option>
            <option value="2">
              {getTranslation(
                translations,
                selectedLanguage,
                "Female",
                "Female"
              )}
            </option>
            <option value="3">
              {getTranslation(
                translations,
                selectedLanguage,
                "Others_Gender",
                "Others"
              )}
            </option>
          </select>
          {inputErrors.gender && (
            <p className="text-red-500 text-xs pt-[2px]">
              {inputErrors.gender}
            </p>
          )}
        </div>
        {/* Appointment Date */}
        <div>
          <InputLabel
            text={getTranslation(
              translations,
              selectedLanguage,
              "Appointment_Date",
              "Appointment Date"
            )}
            required={true}
            className="pb-2"
          />
          <div className="relative" ref={inputRef}>
            <UserAuthInput
              type="text"
              value={formatDateForDisplay(formData.appointmentDate)}
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
              className="cursor-pointer"
            />
            <MdCalendarToday
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowCalendar(!showCalendar)}
            />
            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute z-10 mt-1 w-[90%] h-[400px]"
              >
                <Calendar
                  onChange={handleDateChange}
                  value={new Date(formData.appointmentDate)}
                  minDate={new Date()}
                />
              </div>
            )}
          </div>
          {inputErrors.appointmentDate && (
            <p className="text-red-500 text-xs pt-[2px]">
              {inputErrors.appointmentDate}
            </p>
          )}
        </div>
        {/* Doctors */}
        <div>
          <InputLabel
            text={getTranslation(
              translations,
              selectedLanguage,
              "Select_A_Doctor",
              "Select a Doctor"
            )}
            required={true}
            className="pb-2"
          />
          <div
            className="relative text-text-sm md:text-sm text-primary lg:text-sm"
            ref={dropdownDoctorRef}
          >
            <button
              className="w-full flex items-center  justify-between bg-white py-3 px-3 rounded-md border border-borderColor focus:border-theme focus:outline-none focus:ring-0"
              onClick={() => setIsDoctorDropdownOpen(!isDoctorDropdownOpen)}
            >
              <span className="truncate">{selectedDoctorName}</span>
              <MdKeyboardArrowDown
                className={`text-xl transition-transform duration-200 ${
                  isDoctorDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {isDoctorDropdownOpen && (
              <div className="absolute text-text-sm md:text-sm lg:text-sm top-full left-0 w-full bg-white border border-borderColor shadow-md mt-1 rounded-md z-[6] max-h-60 overflow-hidden">
                <div className="p-2 border-b border-gray-200 flex items-center">
                  <MdSearch className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search doctor..."
                    className="w-full outline-none"
                    value={doctorSearch}
                    onChange={(e) => setDoctorSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-48">
                  {filteredDoctors?.length > 0 ? (
                    <div className="">
                      {filteredDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-text-sm md:text-sm lg:text-sm"
                          onClick={() =>
                            handleDoctorSelect(
                              doctor.id || doctor.doctor_id, // Use whichever field exists
                              `${doctor.first_name} ${doctor.last_name}`
                            )
                          }
                        >
                          {doctor.first_name} {doctor.last_name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 text-gray-500 text-center">
                      No doctors found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {inputErrors.doctorId && (
            <p className="text-red-500 text-xs pt-[2px]">
              {inputErrors.doctorId}
            </p>
          )}
        </div>
      </div>

      {/* Message Box */}
      <div className="mt-4">
        <InputLabel
          text={getTranslation(
            translations,
            selectedLanguage,
            "Message",
            "Message"
          )}
          required={false}
        />
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
      <div className="flex gap-4 items-center">
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
            icon={<MdBookmarkAdd />}
            loadingTime="2000"
            text={getTranslation(
              translations,
              selectedLanguage,
              "Book_Appointment",
              "Book Appointment"
            )}
            disabled={!googleVal}
          />
        </div>

      </div>
    </div>
  );
};

export default MakeAppointmentForm;
