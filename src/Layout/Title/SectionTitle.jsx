import React from 'react'

const SectionTitle = ({className , text , onClick , }) => {
  return (
    <p onClick={onClick} className={`md:lg:text-[38px] text-theme font-semibold  ${className}`}>{text}</p>
  )
}

export default SectionTitle