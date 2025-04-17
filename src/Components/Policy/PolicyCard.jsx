import React from "react";
import DOMPurify from "dompurify";

const PolicyCard = ({pageData}) => {
    const aboutContent = DOMPurify.sanitize(pageData);
    console.log(pageData);
    
  return (
    <div>
      <div
        className=" py-[20px] sm:py-sectionSm lg:py-sectionMd px-2 sm:px-4 md:px-6 lg:px-24 bg-secondary rounded-md"
        style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
      >
        {aboutContent && (
          <div
            className="blog-content "
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          ></div>
        ) 
        // : (
        //   <AboutDefaultCard />
        // )
        }
      </div>
      
    </div>
  );
};

export default PolicyCard;
