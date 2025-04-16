import React from "react";

const LocationMap = ({ map }) => {
  

  return (
    <div className="w-full h-[130px] sm:h-[180px] md:h-[250px] lg:h-[400px]  overflow-hidden">
        <iframe className="w-full h-full" src={` ${map ? map : ""}`} frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      {/* Render the iframe using the map prop */}
      {/* <div className="w-full h-[500px]" dangerouslySetInnerHTML={{ __html: map }} /> */}
    </div>
  );
};

export default LocationMap;