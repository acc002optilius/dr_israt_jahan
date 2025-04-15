import React, { useEffect, useState } from 'react'
import SectionTitle from '../Layout/Title/SectionTitle'
import InputLabel from '../Layout/Input/InputLabel/InputLabel'
import UserAuthInput from '../Layout/Input/UserAuthForm/UserAuthInput'
import { getTranslation } from '../Utils/Translation/translationUtils'
import { findDoctorsApi } from '../Api/Api'
import Container from '../Layout/Container'
import DoctorCard from '../Layout/Card/DoctorCard'
import MinTitle from '../Layout/Title/MinTitle'
const Doctors = ({
  selectedLanguage,
  translations,
  handleChange,
  Search_by_Department,
  Search_by_Name,
  inputErrors
}) => {
  const [apiData, setApiData] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(findDoctorsApi)
      .then((res) => {
        if (!res.ok) throw new Error('Something went wrong!')
        return res.json()
      })
      .then((data) => {
        setApiData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!apiData?.data?.departments?.length) return <p>No departments found.</p>

  const departments = apiData.data.departments

  // Just for demo: Simulate doctors based on departments (until API provides doctors list)
  const dummyDoctors = departments.map((dept, index) => ({
    id: index + 1,
    name: `Dr. ${dept.name}`,
    department: dept.name
  }))

  const filteredDoctors = dummyDoctors.filter((doctor) => {
    const matchesName = Search_by_Name
      ? doctor.name.toLowerCase().includes(Search_by_Name.toLowerCase())
      : true

    const matchesDept = Search_by_Department
      ? doctor.department === Search_by_Department
      : true

    return matchesName && matchesDept
  })

  return (
    <>
      <section className='shadow-md py-10'>
        <div className='xl:max-w-[880px] max-[448px]:w-[300px] mx-auto p-5 shadow-md rounded-lg bg-white'>
          <SectionTitle className="text-center mb-8" text="Find A Doctor" />

          <div className='grid lg:grid-cols-2 gap-3 md:gap-4 mb-5'>
            {/* Search by Department */}
            <div>
              <InputLabel
                text={getTranslation(
                  translations,
                  selectedLanguage,
                  'Search_by_Department',
                  'Search by Department'
                )}
                required={true}
              />
              <select
                className="py-3 pr-[20px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-[1px] border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={(e) => handleChange('Search_by_Department', e.target.value)}
                value={Search_by_Department}
              >
                <option value="">
                  {getTranslation(translations, selectedLanguage, 'Search_by_Department', '--Search by Department--')}
                </option>
                {departments.map((dept) => {
                  const translated = dept.translation?.find(t => t.lang_code === selectedLanguage)
                  const displayName = translated?.name || dept.name
                  return (
                    <option key={dept.id} value={dept.name}>
                      {displayName}
                    </option>
                  )
                })}
              </select>
              {inputErrors?.Search_by_Department && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.Search_by_Department}
                </p>
              )}
            </div>

            {/* Search by Name */}
            <div>
              <InputLabel
                text={getTranslation(
                  translations,
                  selectedLanguage,
                  'Search_by_Name',
                  'Search by Name'
                )}
                required={true}
                className="pb-2"
              />
              <UserAuthInput
                onChange={(name, value) => handleChange('Search_by_Name', value)}
                value={Search_by_Name}
                type="text"
                placeholder={getTranslation(
                  translations,
                  selectedLanguage,
                  'Search_by_Name',
                  'Search by Name'
                )}
                name="Search_by_Name"
                required={true}
              />
              {inputErrors?.Search_by_Name && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.Search_by_Name}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Container>

        <SectionTitle className="text-center mt-10" text="Doctors" />

        <MinTitle className="text-center mt-2 w-96 mx-auto mb-5" text="We have a team of experienced and qualified doctors who can provide you with the best possible care." />

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-5">
          {filteredDoctors.length ? (
            filteredDoctors.map((doctor) => {
              return (
                <DoctorCard
                  key={doctor.id}
                  id={doctor.id}
                  firstName={doctor.name.split(' ')[1]}
                  lastName={doctor.name.split(' ')[0]}
                  department={doctor.department}
                  image={doctor.image} // Assuming you have an image property
                  defaultDoctorImg="/path/to/default/image.jpg" // Replace with your default image path
                  socialNetworks={doctor.socialNetworks} // Assuming you have a socialNetworks property
                />
              )
            })
          ) : (
            <p className="text-gray-500">No doctors match your search.</p>
          )}



        </div>
      </Container>


      {/* Filtered Doctors List */}

    </>
  )
}

export default Doctors
