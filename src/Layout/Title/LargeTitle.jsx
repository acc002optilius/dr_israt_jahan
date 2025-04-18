import React from 'react'

const LargeTitle = ({className , text}) => {
  return (
    <h1 className={`text-xl md:text-2xl lg:text-3xl text-primary ${className}`}>{text}</h1>
  )
}

export default LargeTitle