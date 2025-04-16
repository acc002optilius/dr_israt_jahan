import React, { useEffect , useState} from "react";
import { useSelector } from "react-redux";
import Container from "../Layout/Container";
import { TbEyeCheck, TbTargetArrow } from "react-icons/tb";
import { FaHandHoldingMedical } from "react-icons/fa6";
import MinTitle from "../Layout/Title/MinTitle";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "../Layout/Title/SectionTitle";
import {
  contactPageApi
} from "../Api/Api";
import axios from "axios";
import {getTranslation} from "../Utils/Translation/translationUtils"
import ContactForm from "../Components/Form/ContactForm";
const Contact = () => {
  const [isLoading , setIsLoading] = useState(true);
  const [translations , setTranslatios] = useState({})
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
    useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration in ms
        once: false, // allows animation every time section enters view
      });
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          // Fetch all data in parallel
          const response = await axios.get(contactPageApi)
          setTranslatios(response.data.data.translations)
          console.log(response);
          
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
  
      return () => {
        setIsLoading(false);
      };
    }, []);
 console.log(translations);
 
  
  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
      <Container>
        <SectionTitle
                    text={getTranslation(
                      translations,
                      selectedLanguage,
                      "Contact_Us",
                      "Contact Us"
                    )}
                    className="text-center !text-primary"
                  />
        <div className=" grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="">
              <ContactForm/>
            </div>
            <div className="">Social</div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;

