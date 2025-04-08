import React from "react";
import Container from "../../Layout/Container";
import cmoImg from "../../assets/cmoImg.png";
import SectionTitle from "../../Layout/Title/SectionTitle";
import MinTitle from "../../Layout/Title/MinTitle";
const CMO = () => {
  return (
    <div>
      <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-secondary ">
        <Container>
          <div className="grid grid-cols-12  items-center justify-between ">
            <div className="col-span-6">
              <div className="shadow-lg w-[80%]  ">
                <img src={cmoImg} alt=""  className="rounded-lg"/>
              </div>
            </div>
            <div className="col-span-6">
              <SectionTitle text="Welcome to Our
               Healthcare" />
              <MinTitle
                text={`"At our healthcare center, we prioritize patient well-being and deliver compassionate care. Our dedicated team of professionals is here to ensure the highest standards of medical excellence for you and your family."`}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CMO;
