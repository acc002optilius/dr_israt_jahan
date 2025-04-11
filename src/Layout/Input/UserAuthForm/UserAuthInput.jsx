import React from 'react'

const UserAuthInput = ({value , placeholder , type , name , required , autoComplete , onChange , id, className , onKeyDown}) => {
  const handleInputChange = (e) => {
    const newValue = (e.target.value)
    onChange(name , newValue)
  }
  return (
    <input onKeyDown={onKeyDown} value={value} onChange={handleInputChange} className={`inline-block text-sm md:text-sm lg:text-sm font-normal rounded-md md:rounded-md lg:rounded-md px-3 sm:px-3 md:px-4 lg:px-3 py-3 sm:py-3 md:py-3 lg:py-3 bg-secondary text-primary border-[1px] border-borderColor focus:border-theme !outline-0 !ring-0 focus:!ring-0  w-full placeholder:text-primary placeholder:opacity-[0.8] ${className}`} placeholder={placeholder} type={type} name={name} id={id}  required={required} autoComplete={autoComplete}/>
  )
}

export default UserAuthInput