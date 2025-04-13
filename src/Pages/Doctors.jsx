import React from 'react'
import { useSelector } from 'react-redux'

const Doctors = () => {
    const selectedLanguage = useSelector((state) => console.log(state)
    )
  return (
    <div>Doctors</div>
  )
}

export default Doctors