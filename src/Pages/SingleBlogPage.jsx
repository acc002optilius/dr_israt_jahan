import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import ExtraMinTitle from "../Layout/Title/ExtraMinTitle";
import RecentBlogCard from "../Layout/Card/RecentBlogCard";
import ReletedBlogCard from "../Layout/Card/ReletedBlogCard";
import { IoTimeOutline } from "react-icons/io5";
import MinTitle from "../Layout/Title/MinTitle";
import DOMPurify from "dompurify";
import { api, singleBlogApi, version } from "../Api/Api";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const SingleBlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  // const { link } = useParams();
  const { slug } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${singleBlogApi}=${slug}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        setBlogData(response.data.data) || {};
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const blog = blogData?.blog;
  const relatedBlogs = blogData?.related_blogs;
  const recentBlogs = blogData?.recent_blogs;
  // Translation
  const translation = blog?.translations.find(
    (trans) => trans.lang_code === selectedLanguage.lang_code
  );
  const sanitizedContent = DOMPurify.sanitize(
    translation ? translation.description : blog?.description
  );

  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-12 items-start gap-8 justify-center ">
          <div className="md:col-span-3 lg:col-span-8">
            {loading ? (
              <div className="py-3">
                <div className="w-full h-2 md:h-3 rounded-lg bg-skeletonLoading animate-pulse"></div>
                <div className="w-[60%] mt-3 h-2 md:h-3 rounded-lg bg-skeletonLoading animate-pulse"></div>
              </div>
            ) : (
              <LargeTitle
                className="font-semibold "
                text={translation ? translation.title : blog?.title}
              />
            )}

            <div className="py-2 md:py-4 lg:py-6 flex items-center gap-6">
              {loading ? (
                <div className="w-24 h-2 rounded-lg bg-skeletonLoading animate-pulse"></div>
              ) : (
                <ExtraMinTitle
                  text={
                    selectedLanguage?.lang_code === "bn" &&
                    blog?.category?.translations?.[0]?.name
                      ? blog.category.translations[0].name
                      : blog?.category?.name
                  }
                  className="text-theme"
                />
              )}
              {loading ? (
                <div className="w-24 h-2 rounded-lg bg-skeletonLoading animate-pulse"></div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-tertiary">
                    <IoTimeOutline />
                  </p>
                  <ExtraMinTitle
                    text={blog?.created_at}
                    className="text-tertiary"
                  />
                </div>
              )}
            </div>
            {loading ? (
              <div className="w-full aspect-[16/9] rounded-lg  bg-skeletonLoading animate-pulse mt-1"></div>
            ) : (
              <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
                <img
                  loading="lazy"
                  src={`${api}/${blog?.thumbnail}`}
                  alt={blog?.title}
                  className="w-full h-auto  object-fill"
                />
              </div>
            )}
            {/* this from summer note */}
            {/* <MinTitle
              className="text-tertiary pt-3 sm:pt-4 md:pt-6 lg:pt-sectionSm"
              text={blog.description}
            /> */}
            <div
              className="blog-content pt-sectionSm"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            ></div>
          </div>

          <div className="md:col-span-4 lg:col-span-4 sticky top-[120px]">
            <div
              className="p-2 sm:p-4 md:p-6 lg:p-6 bg-secondary rounded-md grid sm:grid-cols-1 md:grid-cols-1 gap-x-6 gap-y-6"
              style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
            >
              {/* Related Blogs */}
              <div className="related-posts ">
                {loading ? (
                  <div className="border-b-[1px] border-borderColor pb-5">
                    {Array.from({ length: 2 }).map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-8  items-center gap-x-2 sm:gap-x-3 md:gap-x-3 lg:gap-x-2 my-2 rounded-sm"
                      >
                        <div className=" col-span-2 sm:col-span-2  md:col-span-2 lg:col-span-3 md:max-h-[80px] aspect-[5/3] overflow-hidden rounded-sm bg-skeletonLoading "></div>
                        <div className="col-span-3 sm:col-span-5 md:col-span-5 lg:col-span-4 py-[2px] w-full">
                          <div className="w-full h-2 bg-skeletonLoading animate-pulse rounded-full"></div>
                          <div className="w-[60%] h-2 mt-2 bg-skeletonLoading animate-pulse rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="">
                    {relatedBlogs?.length > 0 && (
                      <div className="div">
                        <LargeTitle
                          className="pb-2 font-medium"
                          text="Related Blogs"
                        />
                        {relatedBlogs?.map((item, index) => {
                          // Find translation that matches the selected language
                          const relatedTranslation = item.translations.find(
                            (trans) =>
                              trans.lang_code === selectedLanguage.lang_code
                          );

                          return (
                            <ReletedBlogCard
                              key={index}
                              id={item.id}
                              title={
                                relatedTranslation
                                  ? relatedTranslation.title
                                  : item.title
                              }
                              thumbnail={item.thumbnail}
                              publishedDate={item.display_date}
                              slug={item.slug}
                              loading={loading}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Recent Blogs */}
              <div className="recent-posts ">
                {loading ? (
                  <div className="">
                    {Array.from({ length: 2 }).map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-8  items-center gap-x-2 sm:gap-x-3 md:gap-x-3 lg:gap-x-2 my-2 rounded-sm"
                      >
                        <div className=" col-span-2 sm:col-span-2  md:col-span-2 lg:col-span-3 md:max-h-[80px] aspect-[5/3] overflow-hidden rounded-sm bg-skeletonLoading "></div>
                        <div className="col-span-3 sm:col-span-5 md:col-span-5 lg:col-span-4 py-[2px] w-full">
                          <div className="w-full h-2 bg-skeletonLoading animate-pulse rounded-full"></div>
                          <div className="w-[60%] h-2 mt-2 bg-skeletonLoading animate-pulse rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="">
                    {recentBlogs?.length > 0 && (
                      <div className="div">
                        <LargeTitle
                          className="pb-2 font-medium"
                          text="Recent Blogs"
                        />
                        {recentBlogs.map((item, index) => {
                          const recentTranslation = item.translations.find(
                            (trans) =>
                              trans.lang_code === selectedLanguage.lang_code
                          );
                          return (
                            <RecentBlogCard
                              key={index}
                              id={item.id}
                              title={
                                recentTranslation
                                  ? recentTranslation.title
                                  : item.title
                              }
                              thumbnail={item.thumbnail}
                              publishedDate={item.display_date}
                              slug={item.slug}
                              loading={loading}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Blog Details */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
