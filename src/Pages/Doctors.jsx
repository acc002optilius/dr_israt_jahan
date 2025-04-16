import React, { useEffect, useState } from 'react'
import SectionTitle from '../Layout/Title/SectionTitle'
import InputLabel from '../Layout/Input/InputLabel/InputLabel'
import UserAuthInput from '../Layout/Input/UserAuthForm/UserAuthInput'
import { getTranslation } from '../Utils/Translation/translationUtils'
import { findDoctorsApi, doctorsApi } from '../Api/Api'
import Container from '../Layout/Container'
import DoctorCard from '../Layout/Card/DoctorCard'
import MinTitle from '../Layout/Title/MinTitle'
import LoadingButton from '../Layout/Button/LoadingButton'
import { useSelector } from 'react-redux'

const Doctors = () => {

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const [translations, setTranslations] = useState({})

  const [visibleItems, setVisibleItems] = useState(12);

  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search_by_Name, setSearchByName] = useState('')
  const [search_by_Department, setSearchByDepartment] = useState('')
  const [inputErrors, setInputErrors] = useState({})

  const viewMoreDoctors = () => {
    setVisibleItems((prev) => prev + 8)
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(findDoctorsApi)
        if (!res.ok) throw new Error('Failed to fetch departments.')
        const data = await res.json()
        setDepartments(data.data?.departments || [])
      } catch (err) {
        setError(err.message)
      }
    }

    const fetchDoctors = async () => {
      setLoading(true)
      try {
        const res = await fetch(doctorsApi)
        if (!res.ok) throw new Error('Failed to fetch doctors.')
        const data = await res.json()
        setTranslations(data.data?.translations || {})
        setDoctors(data.data?.doctors || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
    fetchDoctors()
  }, [])

  const handleChange = (field, value) => {
    if (field === 'search_by_Name') setSearchByName(value)
    if (field === 'search_by_Department') setSearchByDepartment(value)

    // Optional input validation
    setInputErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const filteredDoctors = doctors.filter((doctor) => {

    // Check if the name matches the search input
    const doctorName = doctor?.first_name + doctor?.last_name
    const matchesName = search_by_Name
      ? doctorName?.toLowerCase().includes(search_by_Name?.toLowerCase())
      : true

    // Check if the department matches the selected department
    const matchesDept = search_by_Department
      ? doctor.department.name === search_by_Department
      : true
    return matchesName && matchesDept
  })




  if (error) return <p className="text-red-500">Error: {error}</p>
  // Get translated department name
  const getTranslatedContent = (item) => {
    if (
      !selectedLanguage ||
      !item.translations ||
      item.translations.length === 0
    ) {
      return {
        name: item.name,
        short_description: item.short_description,
      };
    }

    // Find matching translation for current language
    const translation = item.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );


    return {
      name: translation?.name || item.name,
      short_description:
        translation?.short_description || item.short_description,
    };
  };

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
                  'Search_By_Department',
                  'Search By Department'
                )}
                required={true}
              />
              <select
                className="py-3 pr-[20px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-[1px] border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={(e) => handleChange('search_by_Department', e.target.value)}
                value={search_by_Department}
              >
                <option value="">
                  {getTranslation(translations, selectedLanguage, 'Search_By_Department', '--Search By Department--')}
                </option>

                {/* Map through departments and create options */}
                {departments?.map((item, index) => {
                  const content = getTranslatedContent(item);

                  return (
                    <option key={index} value={content.name}>
                      {content.name}
                    </option>
                  )
                })}
              </select>
              {inputErrors?.search_by_Department && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.search_by_Department}
                </p>
              )}
            </div>

            {/* Search by Name */}
            <div>
              <InputLabel
                text={getTranslation(
                  translations,
                  selectedLanguage,
                  'Search_By_Name',
                  'Search By Name'
                )}
                required={true}
              />
              <UserAuthInput
                className="py-3 pr-[20px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-[1px] border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={(name, value) => handleChange('search_by_Name', value)}
                value={search_by_Name}
                type="text"
                placeholder={getTranslation(
                  translations,
                  selectedLanguage,
                  'Search_By_Name',
                  'Search By Name'
                )}
                name="Search_By_Name"
                required={true}
              />
              {inputErrors?.search_by_Name && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.search_by_Name}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Container>
        <SectionTitle className="text-center mt-10" text="Doctors" />
        <MinTitle
          className="text-center mt-2 w-96 mx-auto mb-5"
          text="We have a team of experienced and qualified doctors who can provide you with the best possible care."
        />


        {loading  ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(visibleItems)].map((_, index) => (
              <div
              key={index}
                className="border-[1px] border-primary border-opacity-[0.1] "
              >
                <div className="aspect-[14/9] overflow-hodden rounded-lg bg-skeletonLoading animate-pulse max-h-[250px]">
                  <img className="w-full h-[230px] object-fit vertical-middle group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center bg-skeletonLoading animate-pulse rounded-lg" />
                </div>

                <div className="p-4">
                  <div className="name w-[80%] h-3 mt-6 rounded-lg bg-skeletonLoading animate-pulse"></div>
                  <div className="name w-[40%] h-3 mt-2 rounded-lg bg-skeletonLoading animate-pulse"></div>
                  <div className="category w-[50%] mt-6 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                </div>
              </div>
             ))} 
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-5">
            {filteredDoctors.length ? (
              filteredDoctors.slice(0, visibleItems).map((doctor, index) => (
                <DoctorCard
                  key={index}
                  id={doctor.doctor_id}
                  firstName={doctor.first_name}
                  lastName={doctor.last_name}
                  department={doctor.department}
                  image={doctor.image}
                  socialNetworks={doctor.socialNetworks}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No doctors match your search.
              </p>
            )}
          </div>
        )}


        {filteredDoctors?.length > visibleItems && (
          <div className="mt-4 text-center mx-auto">
            <div className="inline-block pt-4">
              <LoadingButton
                className="inline-block"
                loadingTime="1000"
                text="Load More"
                onClick={viewMoreDoctors}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  )
}

export default Doctors
