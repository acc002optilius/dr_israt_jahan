import React from 'react'

const MinTitle = ({className , text , onClick}) => {
  return (
    <p onClick={onClick} className={`text-sm md:text-base text-primary  ${className}`}>{text}</p>
  )
}

export default MinTitle