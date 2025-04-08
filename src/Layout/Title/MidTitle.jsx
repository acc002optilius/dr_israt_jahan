import React from 'react'

const MidTitle = ({className , text , onClick}) => {
  return (
    <p onClick={onClick} className={`text-2xl  ${className}`}>{text}</p>
  )
}

export default MidTitle