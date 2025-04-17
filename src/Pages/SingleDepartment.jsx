import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, singleDepartmentApi } from "../Api/Api";
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

const SingleDepartment = () => {
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
        const res = await fetch(`${singleDepartmentApi}=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch department");
        const data = await res.json();

        setDepartment(data.data?.department || {});
        const translationArray = data.data?.department?.translations || [];
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

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      caption: (fancybox, slide) => {
        const imgIndex = slide.index;
        const imageData = department.gallery?.[imgIndex];

        return getImageCaption(imageData);
      },
    });

    return () => {
      Fancybox.unbind("[data-fancybox='gallery']");
      Fancybox.close();
    };
  }, [selectedLanguage, department.gallery]);

  const viewMoreDoctors = () => {
    setVisibleItems((prev) => prev + 4);
  };

  const handlLoadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };

  if (loading) return (
    <Container className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
      <div className="">
        <div className="name w-[40%] h-6 my-5 rounded-full bg-skeletonLoading animate-pulse"></div>
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
    navigate("/error", { state: { error } });
    return null;
  }

  const getTranslatedContent = (item) => {
    if (!selectedLanguage || !item.translations || item.translations.length === 0) {
      return {
        title: item.title,
        description: item.description,
      };
    }

    const translation = item.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );

    return {
      title: translation?.title || item.title,
      description: translation?.description || item.description,
    };
  };

  const getTranslation = (key, defaultText) => {
    if (!translations || !selectedLanguage) return defaultText;
    const translationArray = translations[key];
    if (!translationArray) return defaultText;
    const translation = translationArray.find(
      (item) => item.lang_code === selectedLanguage?.lang_code
    );
    return translation ? translation.value : defaultText;
  };

  const getImageCaption = (imageData) => {
    if (!imageData?.translations || !selectedLanguage) return imageData?.caption || "";
    const translation = imageData.translations.find(
      (item) => item.lang_code === selectedLanguage.lang_code
    );
    return translation ? translation.caption : imageData.caption || "";
  };

  const translated = translations[selectedLanguage?.lang_code] || {};
  const displayName = translated.name || department.name;
  const shortDesc = translated.short_description || department.short_description;
  const detailedDesc = translated.detailed_description || department.detailed_description;

  return (
    <div className="">

      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
          <SectionTitle className="!text-primary" text={displayName} />
          <div className="relative aspect-[12/7] py-2 rounded-t-lg flex-1 overflow-hidden">
            <img
              loading="lazy"
              src={`${api}/${department.image}`}
              alt={department.name}
              className="w-full rounded-md h-full object-fill"
            />
          </div>
          <p className="py-2.5">{shortDesc}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: htmlTruncate(DOMPurify.sanitize(detailedDesc))
            }}
          />
        </div>
      </Container>

      {/* Services */}
      <div className="bg-theme bg-opacity-[0.3]">
        <Container>
          <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
            <SectionTitle  className="!text-primary" text={getTranslation("Services", "Services")} />
            <MinTitle
              className={" mx-auto "}
              text={getTranslation(
                "Single_Department_Services",
                "Cardiology encompasses a broad range of conditions affecting the heart and blood vessels, including"
              )}
            />

            {department?.services?.map((service, index) => {
              const translation = service.translations?.find(
                t => t.lang_code === selectedLanguage?.lang_code
              );
              const displayName = translation?.name || service.name;

              return (
                <ul className="ml-5" key={index}>
                  <li className="list-disc">{displayName}</li>
                </ul>
              );
            })}

          </div>
        </Container>
      </div>

      {/* Doctors */}
      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
          <SectionTitle className="text-center" text={getTranslation("Doctors", "Doctors")} />
          <MinTitle
            className="text-center mt-2 mx-auto mb-5"
            text={getTranslation("Single_Department_Doctors", "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers.")}
          />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3.5">
              {[...Array(visibleItems)].map((_, index) => (
                <div
                  key={index}
                  className="border-[1px] border-primary border-opacity-[0.1] rounded-lg"
                >
                  <div className="aspect-[14/9] overflow-hodden rounded-lg bg-skeletonLoading animate-pulse max-h-[250px]">
                    <img className="w-full h-[230px] object-fit vertical-middle group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center bg-skeletonLoading animate-pulse rounded-lg" />
                  </div>

                  <div className="p-4">
                    <div className="name w-[80%] h-3 mt-6 rounded-lg bg-skeletonLoading animate-pulse"></div>
                    <div className="name w-[40%] h-3 mt-2 rounded-lg bg-skeletonLoading animate-pulse"></div>
                    <div className="category w-[50%] mt-6 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
              {department?.doctors?.slice(0, visibleItems).map((doctor, index) => (
                <DoctorCard
                  key={index}
                  id={doctor.doctor_id}
                  firstName={doctor.first_name}
                  lastName={doctor.last_name}
                  department={doctor.department}
                  image={doctor.image}
                  socialNetworks={doctor.socialNetworks}
                />
              ))}
            </div>
          )}


          {department?.doctors?.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <div className="inline-block pt-4">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text="Load More"
                  onClick={viewMoreDoctors}
                />
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* case study */}
      <div className="bg-theme bg-opacity-[0.3] pt-9 pb-16">
        <Container>
          <SectionTitle className="text-center mt-10" text={getTranslation("Case_Study", "case study")} />
          <MinTitle
            className="text-center mt-2 mx-auto mb-5"
            text={getTranslation("Single_Department_Case_Studies", "Case Studies That Inspire Confidence")} />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3.5">
              {[...Array(visibleItems)].map((_, index) => (
                <div
                  key={index}
                  className="border-[1px] border-primary border-opacity-[0.1] rounded-lg"
                >
                  <div className="aspect-[14/9] overflow-hodden rounded-lg bg-skeletonLoading animate-pulse max-h-[250px]">
                    <img className="w-full h-[230px] object-fit vertical-middle group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center bg-skeletonLoading animate-pulse rounded-lg" />
                  </div>

                  <div className="p-4">
                    <div className="name w-[80%] h-3 mt-6 rounded-lg bg-skeletonLoading animate-pulse"></div>
                    <div className="name w-[40%] h-3 mt-2 rounded-lg bg-skeletonLoading animate-pulse"></div>
                    <div className="category w-[50%] mt-6 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-5">
              {department?.case_studies?.slice(0, visibleItems).map((item, index) => {
                const content = getTranslatedContent(item);
                return (
                  <CaseStudisCard
                    key={index}
                    title={content?.title}
                    slug={item?.slug}
                    shortDesc={content?.description}
                    socialNetworks={item?.social_networks}
                    image={item?.thumbnail}
                    department={item?.department}
                  />
                )
              })}
            </div>
          )}


          {department?.case_studies?.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <div className="inline-block pt-4">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text="Load More"
                  onClick={viewMoreDoctors}
                />
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* Gallery */}
      <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
        <Container>
          <div
            className="text-center mb-4"
            data-aos="fade-in"
            data-aos-duration="500"
            data-aos-delay="200"
          >
            <SectionTitle
              className="!text-center"
              text={getTranslation("Gallery", "Gallery")}
            />
            <MinTitle
              className="!text-center w-full sm:w-[50%] text-primary mx-auto py-2"
              text={getTranslation(
                "Single_Department_Gallery",
                "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers."
              )}
            />
          </div>

          {/* Gallery Container */}
          <div className="pt-2" data-aos="fade-up">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[...Array(visibleItems)].map((_, index) => (
                  <div key={index} className="aspect-[4/4] overflow-hidden bg-skeletonLoading animate-pulse rounded-lg">
                    <div className="w-full h-full bg-skeletonLoading animate-pulse rounded-lg" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {department.gallery?.slice(0, visibleItems).map((item, index) => (
                  <div key={index} className="group aspect-[4/4] overflow-hidden rounded-lg">
                    <a
                      href={`${api}/${item.image}`}
                      data-fancybox="gallery"
                      data-caption={getImageCaption(item)}
                      className="block object-fill w-full h-full"
                    >
                      <img
                        src={`${api}/${item.image}`}
                        alt={getImageCaption(item)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {department.gallery?.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <div className="inline-block pt-4">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text="Load More"
                  icon={<IoReloadSharp />}
                  onClick={handlLoadMore}
                />
              </div>
            </div>
          )}
        </Container>
      </div>

    </div>
  );
};

export default SingleDepartment;