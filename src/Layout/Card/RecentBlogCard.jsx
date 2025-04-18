import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ExtraMinTitle from "../../Layout/Title/ExtraMinTitle";
import { IoTimeOutline } from "react-icons/io5";
import { api, version } from "../../Api/Api";
import axios from "axios";

const RecentBlogCard = ({ id, title, thumbnail, publishedDate, slug }) => {
  const encodedTitle = encodeURIComponent(title); // Encode the title for the URL
  const navigate = useNavigate();
  const fetchBlogDetails = async () => {
    navigate(`/blog/${slug}`);
  };
  return (
    <div>
      <div onClick={fetchBlogDetails} key={id} className="group cursor-pointer">
        {" "}
        {/* Use encoded title in URL */}
        <div
          className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-8 items-center gap-x-2 sm:gap-x-3 md:gap-x-3 lg:gap-x-2 my-2 rounded-sm"
          style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
        >
          <div className="col-span-2 sm:col-span-2  md:col-span-2 lg:col-span-3 overflow-hidden rounded-sm">
            <div className=" md:max-h-[80px] aspect-[5/3] ">
              <img
                src={`${api}/${thumbnail}`}
                className=" object-fill align-middle h-full w-full"
              />
            </div>
          </div>
          <div className="col-span-3 sm:col-span-5 md:col-span-5 lg:col-span-4 py-[2px]">
            <p className=" text-[12px] sm:text-[12px] md:text-[10px] lg:text-xs font-medium text-tertiary group-hover:text-theme duration-500">
              {title?.length > 30 ? `${title.substring(0, 30)}...` : title}
            </p>
            <div className="pt-[2px] flex items-center gap-[5px] text-[8px] md:text-[8px] lg:text-[10px] text-tertiary">
              <IoTimeOutline />
              <p className="   ">{publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogCard;
