import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "../../Layout/Title/SectionTitle";
import Container from "../../Layout/Container";
import { useSelector } from "react-redux";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { subscriptionApi } from "../../Api/Api";

import newsletter from "../../assets/Newsletter/newsletter.jpg";
import UserAuthInput from "../../Layout/Input/UserAuthForm/UserAuthInput";
import { getTranslation } from "../../Utils/Translation/translationUtils";
import axios from "axios";
import SubmitButton from "../../Layout/Button/SubmitButton";
import { Bounce, toast } from "react-toastify";
import { GrSend } from "react-icons/gr";
import LoadingButton from "../../Layout/Button/LoadingButton";
import AOS from "aos";
import "aos/dist/aos.css";
const Newsletter = ({ translations, data }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);
  const handleChangeEmail = (name, value) => {
    if (name === "email") {
      setEmail(value); // Logs the input value
    }
  };

  // submit
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        subscriptionApi,
        {
          email: email,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);

      if (response.data.status === true) {
        setEmail("");
        setInputErrors({
          email: "",
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
            email: errorMessages.email ? errorMessages.email[0] : "",
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
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${newsletter})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
          <div className="" data-aos="fade-up">
            <SectionTitle
              className="!text-center !text-secondary"
              text={`${getTranslation(
                translations,
                selectedLanguage,
                "Subscribe_Our_Newsletter",
                "Subscribe Our Newsletter"
              )}`}
            />
            <MinTitle
              className="!text-center w-full lg:w-[50%] text-secondary m-auto py-2"
              text={`${getTranslation(
                translations,
                selectedLanguage,
                "Subscribe_Our_Newsletter_Home_Section_Desc",
                "Subscribe our newsletter for latest updates from our medical anytime"
              )}`}
            />
            <div className=" sm:[45%] md:w-[35%] m-auto pt-2 md:pt-4">
              <UserAuthInput
                className="!rounded-none !py-3"
                onChange={handleChangeEmail}
                type="text"
                value={email}
                placeholder={getTranslation(
                  translations,
                  selectedLanguage,
                  "Email_Address",
                  "Email Address"
                )}
                name="email"
                required
              />
              {inputErrors.email && (
                <p className="text-red-500 text-xs pt-1">{inputErrors.email}</p>
              )}
            </div>
            <div className="mx-auto lg-[15%] text-center">
              <LoadingButton
                className="mt-4 md:mt-2 !border-none "
                onClick={handleSubmit}
                icon={<GrSend />}
                type="button"
                // loadingTime="2000"
                text={getTranslation(
                  translations,
                  selectedLanguage,
                  "Subscribe",
                  "Subscribe"
                )}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Newsletter;
