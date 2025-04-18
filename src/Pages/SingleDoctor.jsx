import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api, singleDoctorApi } from "../Api/Api";
import Container from "../Layout/Container";
import SectionTitle from "../Layout/Title/SectionTitle";
import DOMPurify from "dompurify";
import htmlTruncate from "html-truncate";
import { useSelector } from "react-redux";
import MinTitle from "../Layout/Title/MinTitle";
import DoctorCard from "../Layout/Card/DoctorCard";
import LoadingButton from "../Layout/Button/LoadingButton";
import CaseStudisCard from "../Layout/Card/CaseStudisCard";
import { IoReloadSharp } from "react-icons/io5";
import "aos/dist/aos.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import MidTitle from "../Layout/Title/MidTitle";
import LargeTitle from "../Layout/Title/LargeTitle";
import ExtraMinTitle from "../Layout/Title/ExtraMinTitle";
import SubmitButton from "../Layout/Button/SubmitButton";
import { getTranslation } from "../Utils/Translation/translationUtils";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { createPortal } from "react-dom";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import MakeAppointment from "../Components/Home/MakeAppointment";
import MakeAppointmentForm from "../Components/Form/MakeAppointmentForm";
import { MdBookmarkAdd } from "react-icons/md";
import defaultDoctorImg from "../assets/Doctor/defaultDoctorImg.jpg";

const SingleDoctor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(4);
  const [doctor, setDoctor] = useState({});
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const doctorId = location?.state?.id;
  console.log(doctorId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${singleDoctorApi}=${doctorId}`);
        if (!res.ok) throw new Error("Failed to fetch doctor");
        const data = await res.json();
        console.log(data);

        setDoctor(data.data.doctor || {});
        setTranslations(data.data.translations);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);
  console.log(doctor);

  //   if (loading)
  //     return (
  //       <Container className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
  //         <div className="">
  //           <div className="name w-[40%] h-6 my-6 rounded-full bg-skeletonLoading animate-pulse"></div>
  //           <div className="aspect-[100/9] overflow-hodden rounded-lg bg-skeletonLoading animate-pulse max-h-[700px]">
  //             <img className="w-full h-[500px] object-fit vertical-middle group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center bg-skeletonLoading animate-pulse rounded-lg" />
  //           </div>
  //           <div className="pt-2.5">
  //             <div className="name w-[60%] h-3 mt-4 rounded-lg bg-skeletonLoading animate-pulse"></div>
  //             <div className="name w-[100%] h-2 mt-6 rounded-lg bg-skeletonLoading animate-pulse"></div>
  //             <div className="category w-[90%] mt-3 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
  //             <div className="category w-[80%] mt-3 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
  //           </div>
  //         </div>
  //       </Container>
  //     );

  if (error) {
    // navigate("/error", { state: { error } });
    return null;
  }

  const {
    first_name,
    last_name,
    department,
    education,
    short_bio,
    languages,
    designation,
    specialization,
    visiting_time,
    off_day,
    image,
    room_number,
  } = doctor;

  const translated = translations[selectedLanguage?.lang_code] || {};
  const displayName = translated.title || doctor.title;
  const detailedDesc = translated.description || doctor.description;

  //   Handle For Modal
  // Handle body overflow when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup to reset overflow when component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);
  const handleViewModal = async (slug) => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  //   Handle Submit Appointment
  const handleSubmit = () => {
    handleCloseModal();
  };
  return (
    <div className="">
      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionMd xl:py-sectionMd">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-24">
            <div className="md:col-span-4 ">
              <div className="m-auto">
                {loading ? (
                  <div className="aspect-[4/4] bg-skeletonLoading animate-pulse"></div>
                ) : (
                  <div className="relative  aspect-[4/4]   flex-1 overflow-hidden ">
                    <img
                      loading="lazy"
                      src={image ? `${api}/${image}` : defaultDoctorImg}
                      alt={doctor.name}
                      className="w-full  h-full object-fill "
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-y-1 border-b-[1px] border-borderColor py-3 md:py-6">
                {loading ? (
                  <div className="w-[80%] h-3  bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <MinTitle
                    className="font-bold capitalize"
                    text={`${first_name} ${last_name}`}
                  />
                )}
                {loading ? (
                  <div className="mt-2">
                    <div className="w-[80%] h-3 mt-2 bg-skeletonLoading animate-pulse rounded-full"></div>
                    <div className="w-[80%] h-3 mt-2 bg-skeletonLoading animate-pulse rounded-full"></div>
                  </div>
                ) : (
                  <MinTitle
                    text={
                      department?.translations.find(
                        (trans) =>
                          trans.lang_code === selectedLanguage?.lang_code
                      )?.name || department?.name
                    }
                    className="text-tertiary"
                  />
                )}
                {education?.map((item, index) => {
                  const isLast = index === education.length - 1;
                  return (
                    <MinTitle
                      key={index}
                      text={`${item.degree} (${item.institute})${
                        !isLast ? "," : ""
                      }`}
                      className="text-tertiary"
                    />
                  );
                })}
              </div>
              {/* Submit Button */}
              <div className="inline-block" onClick={handleViewModal}>
                <PrimaryButton
                  className="w-full mt-4 md:mt-6 hover:!bg-transparent hover:!text-theme hover:!border-theme"
                  icon={<MdBookmarkAdd />}
                  type="button"
                  loadingTime="0"
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Book_An_Appointment",
                    "Book an Appointment"
                  )}
                />
              </div>
            </div>
            <div className="md:col-span-8">
              <LargeTitle
                className="font-bold !text-2xl"
                text={getTranslation(
                  translations,
                  selectedLanguage,
                  "Biography",
                  "Biography"
                )}
              />
              {loading ? (
                <div className="my-4">
                  <div className="w-full h-2  bg-skeletonLoading animate-pulse rounded-full"></div>
                  <div className="w-[50%] mt-2 h-2 bg-skeletonLoading animate-pulse rounded-full"></div>
                </div>
              ) : (
                <MinTitle text={short_bio} className="text-primary py-4" />
              )}
              {/* Speciality  */}
              <div className="flex items-center gap-2 border-t-[1px] border-borderColor py-4">
                <MinTitle
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Speciality",
                    "Speciality"
                  )}
                  className="text-primary font-bold "
                />
                :
                {loading ? (
                  <div className="w-[50%] h-3 bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <MinTitle text={specialization} className="text-tertiary" />
                )}
              </div>
              {/* Language */}
              <div className="flex items-start gap-2 border-t-[1px] border-borderColor py-4">
                <MinTitle
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Language",
                    "Language"
                  )}
                  className="text-primary font-bold"
                />
                :
                {loading ? (
                  <div className="w-[50%] h-3 bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <div className="flex flex-wrap w-full gap-1">
                    {languages?.slice(0, 5)?.map((item, index, sliced) => {
                      const isLast = index === sliced.length - 1;
                      return (
                        <MinTitle
                          key={index}
                          text={`${item}${!isLast ? "," : ""}`}
                          className="text-tertiary"
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* designation*/}
              <div className="flex items-center gap-2 border-t-[1px] border-borderColor py-4">
                <MinTitle
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Designation",
                    "Designation"
                  )}
                  className="text-primary font-bold "
                />
                :
                {loading ? (
                  <div className="w-[50%] h-3 bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <MinTitle text={designation} className="text-tertiary" />
                )}
              </div>
              {/* Department  */}
              <div className="flex items-center gap-2 border-t-[1px] border-borderColor py-4">
                <MinTitle
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Speciality",
                    "Speciality"
                  )}
                  className="text-primary font-bold "
                />
                :
                {loading ? (
                  <div className="w-[50%] h-3 bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <MinTitle
                    text={
                      department?.translations.find(
                        (trans) =>
                          trans.lang_code === selectedLanguage?.lang_code
                      )?.name || department?.name
                    }
                    className="text-tertiary"
                  />
                )}
              </div>
              {/* Chamber Time*/}
              <div className="flex items-center gap-2 border-t-[1px] border-borderColor py-4">
                <MinTitle
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Chamber_Time",
                    "Chamber Time"
                  )}
                  className="text-primary font-bold "
                />
                :
                {loading ? (
                  <div className="w-[50%] h-3 bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <MinTitle text={visiting_time} className="text-tertiary" />
                )}
              </div>
              {/* Off Day*/}
              <div className="flex items-center gap-2 border-t-[1px] border-borderColor py-4">
                <MinTitle
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Off_Day",
                    "Off Day"
                  )}
                  className="text-primary font-bold "
                />
                :
                {loading ? (
                  <div className="w-[50%] h-3 bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <MinTitle text={off_day} className="text-tertiary" />
                )}
              </div>
              {/* Room*/}
              <div className="flex items-center gap-2 border-t-[1px] border-borderColor py-4">
                <MinTitle
                  text={getTranslation(
                    translations,
                    selectedLanguage,
                    "Room",
                    "Room"
                  )}
                  className="text-primary font-bold "
                />
                :
                {loading ? (
                  <div className="w-[50%] h-3 bg-skeletonLoading animate-pulse rounded-full"></div>
                ) : (
                  <MinTitle text={room_number} className="text-tertiary" />
                )}
              </div>
            </div>
          </div>
          <SectionTitle className="!text-primary " text={displayName} />
          <p
            dangerouslySetInnerHTML={{
              __html: htmlTruncate(DOMPurify.sanitize(detailedDesc)),
            }}
          />
        </div>
        {createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50   md:h-auto "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleBackdropClick} // Detect backdrop click
              >
                {/* {loading ? (
                <div className="w-12 h-12 bg-skeletonLoading"></div>
              ) : ( */}

                {/* )} */}
                <motion.div
                  className="bg-white !rounded-lg shadow-lg  !relative w-full md:w-1/3 lg:w-[80%]  rounded-lg  overflow-y-auto md:overflow-visible  "
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between py-2 border-b border-borderColor px-4 py-4">
                    <MidTitle
                      text={getTranslation(
                        translations,
                        selectedLanguage,
                        "Book_For_An_Appointment",
                        "Book For an Appointment"
                      )}
                    />
                    <button
                      onClick={handleCloseModal}
                      className=" text-red-500 text:lg md:text-xl lg:text-2xl rounded z-[20] "
                    >
                      <FaXmark />
                    </button>
                  </div>
                  <div className="px-4">
                    <MakeAppointmentForm
                      doctorId={doctorId}
                      translations={translations}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </Container>
    </div>
  );
};

export default SingleDoctor;
