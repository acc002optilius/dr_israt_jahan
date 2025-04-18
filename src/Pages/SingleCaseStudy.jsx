import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, singleCaseStudyApi, singleDepartmentApi } from "../Api/Api";
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

const SingleCaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(4);
  const [department, setDepartment] = useState({});
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await fetch(`${singleCaseStudyApi}=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch department");
        const data = await res.json();
        console.log(data);
        
        setDepartment(data.data.blog || {});
        const translationArray = data.data.blog?.translations || [];
        const translationMap = translationArray.reduce((acc, curr) => {
          acc[curr.lang_code] = curr;
          return acc;
        }, {});
        setTranslations(translationMap);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [slug]);
console.log(department);


  if (loading) return (
    <Container className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
      <div className="">
        <div className="name w-[40%] h-6 my-6 rounded-full bg-skeletonLoading animate-pulse"></div>
        <div className="aspect-[100/9] overflow-hodden rounded-lg bg-skeletonLoading animate-pulse max-h-[700px]">
          <img className="w-full h-[500px] object-fit vertical-middle group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center bg-skeletonLoading animate-pulse rounded-lg" />
        </div>
        <div className="pt-2.5">
          <div className="name w-[60%] h-3 mt-4 rounded-lg bg-skeletonLoading animate-pulse"></div>
          <div className="name w-[100%] h-2 mt-6 rounded-lg bg-skeletonLoading animate-pulse"></div>
          <div className="category w-[90%] mt-3 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
          <div className="category w-[80%] mt-3 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
        </div>
      </div>
    </Container>
  );

  if (error) {
    // navigate("/error", { state: { error } });
    return null;
  }


  const getImageCaption = (imageData) => {
    if (!imageData?.translations || !selectedLanguage) return imageData?.caption || "";
    const translation = imageData.translations.find(
      (item) => item.lang_code === selectedLanguage.lang_code
    );
    return translation ? translation.caption : imageData.caption || "";
  };

  const translated = translations[selectedLanguage?.lang_code] || {};
  const displayName = translated.title || department.title;
  const detailedDesc = translated.description
  || department.description
  ;

  return (
    <div className="">

      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
          <SectionTitle className="!text-primary " text={displayName} />
          <div className="relative aspect-[12/7] py-3 md:py-6 rounded-t-lg flex-1 overflow-hidden ">
            <img
              loading="lazy"
              src={`${api}/${department.thumbnail}`}
              alt={department.name}
              className="w-full rounded-md h-full object-fill"
            />
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: htmlTruncate(DOMPurify.sanitize(detailedDesc))
            }}
          />
        </div>
      </Container>

    </div>
  );
};

export default SingleCaseStudy;