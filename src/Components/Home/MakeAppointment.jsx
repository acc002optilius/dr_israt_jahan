import React, { useEffect } from "react";
import Container from "../../Layout/Container";
import SectionTitle from "../../Layout/Title/SectionTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { FaAmbulance, FaHandHoldingUsd, FaStethoscope } from "react-icons/fa";
import { PiGlobeStandBold, PiHeartbeatBold } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import rounndShape from "../../assets/WhyChoosUs/round.png";
import why2 from "../../assets/WhyChoosUs/why-02.jpg";
import why1 from "../../assets/WhyChoosUs/why-01.jpg";
import why3 from "../../assets/WhyChoosUs/why-03.jpg";
import MakeAppointmentForm from "../Form/MakeAppointmentForm";
import { getTranslation } from "../../Utils/Translation/translationUtils";
import appointmentImage from "../../assets/Home/appointment.png";
const MakeAppointment = ({ translations, doctorsList }) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);

  return (
    <div id="makeAnAppointment" className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-theme bg-opacity-[0.3]   overflow-hidden ">
      <Container>
        <div className="w-full md:w-[95%] bg-secondary mx-auto p-4 px-6 py-12  md:px-12 rounded-3xl " data-aos="fade-up">
          <div className="grid md:grid-cols-12 gap-y-4 gap-x-12 items-center" >
            <div className="md:col-span-5">
              <div className=" flex flex-col justify-between items-center" >
                <div className="">
                  <SectionTitle
                    text={getTranslation(
                      translations,
                      selectedLanguage,
                      "Make_An_Appointment",
                      "Make an appointment"
                    )}
                  />
                  <MinTitle
                    className="py-2"
                    text={getTranslation(
                      translations,
                      selectedLanguage,
                      "Make_An_Appointment_Home_Section_Desc",
                      "Book your appointment with confidence—expert care starts here."
                    )}
                  />
                </div>
                <div className="md:pt-8 hidden md:block w-full h-auto">
                  <img
                    src={appointmentImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-7 " data-aos="fade-in">
              <MakeAppointmentForm
                doctorsList={doctorsList}
                translations={translations}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MakeAppointment;
