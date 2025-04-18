import React from "react";
import Container from "../Layout/Container";
import errorImg from "../assets/404/404.png";
import LargeTitle from "../Layout/Title/LargeTitle";
import MinTitle from "../Layout/Title/MinTitle";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import { IoHome } from "react-icons/io5";
const Error = () => {
  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-secondary">
      <Container>
        <div className="w-[200px] m-auto">
          <img src={errorImg} alt="" className="w-full h-full object-cover" />
        </div>
        <LargeTitle
          className="text-primary font-bold text-center "
          text="Opps! Page not found."
        />
        {/* <ExtraLargeTitle text="Opps! Page not found."/> */}
        <MinTitle
          className=" py-2 md:py-3 lg:py-5 text-center text-tertiary"
          text="Sorry for the inconvenience. Go to our homepage or check out our latest collections."
        />
        <div className="flex justify-center">
          {/* <PrimaryButton className="inline-block  text-center"
            text="Back To Homepage"/> */}
          <PrimaryButton
            className=" hover:text-theme !text-base hover:bg-transparent m-auto !uppercase !text-xs active:text-secondary hover:border-theme active:!border-transparent  "
            text="Back To Home"
            slug="/home"
            icon={<IoHome />}
          />
        </div>
      </Container>
    </div>
  );
};

export default Error;
