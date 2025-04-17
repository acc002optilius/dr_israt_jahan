import React from 'react'

const ExtraMinTitle = ({className , text}) => {
  return (
    <h1 className={`capitalize text-sm sm:text-base md:text-xs lg:text-xs ${className}`}>{text}</h1>
  )
}

export default ExtraMinTitle