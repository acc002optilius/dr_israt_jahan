import React from 'react';

const Container = ({ className = '', children }) => {
  return (
    <div className={`w-full max-w-xl xl:max-w-[1140px] lg:max-w-[1140px] px-4 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
