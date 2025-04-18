import React, { useEffect, useState, useMemo } from 'react'
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
  )

  const [translations, setTranslations] = useState({})
  const [visibleItems, setVisibleItems] = useState(12)
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search_by_Name, setSearchByName] = useState('')
  const [search_by_Department, setSearchByDepartment] = useState('')

  const viewMoreDoctors = () => {
    setVisibleItems((prev) => prev + 8)
  }

  const handleChange = (field, value) => {
    const handlers = {
      search_by_Name: setSearchByName,
      search_by_Department: setSearchByDepartment,
    }
    if (handlers[field]) handlers[field](value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const deptRes = await fetch(findDoctorsApi)
        if (!deptRes.ok) throw new Error('Failed to fetch departments.')
        const deptData = await deptRes.json()
        setDepartments(deptData.data?.departments || [])

        const docRes = await fetch(doctorsApi)
        if (!docRes.ok) throw new Error('Failed to fetch doctors.')
        const docData = await docRes.json()
        setDoctors(docData.data?.doctors || [])
        setTranslations(docData.data?.translations || {})
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getTranslatedContent = (item) => {
    if (
      !selectedLanguage ||
      !item.translations ||
      item.translations.length === 0
    ) {
      return {
        name: item.name,
        short_description: item.short_description,
      }
    }

    const translation = item.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    )

    return {
      name: translation?.name || item.name,
      short_description:
        translation?.short_description || item.short_description,
    }
  }

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesName = search_by_Name
        ? `${doctor.first_name || ''} ${doctor.last_name || ''}`.toLowerCase().includes(search_by_Name.toLowerCase())
        : true

      const matchesDept = search_by_Department
        ? doctor.department?.id?.toString() === search_by_Department
        : true

      return matchesName && matchesDept
    })
  }, [doctors, search_by_Name, search_by_Department])

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
              />
              <select
                className="py-3 pr-[20px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-[1px] border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={(e) => handleChange('search_by_Department', e.target.value)}
                value={search_by_Department}
              >
                <option value="">
                  {getTranslation(translations, selectedLanguage, 'Search_By_Department', '--Search By Department--')}
                </option>
                {departments?.map((item) => {
                  const content = getTranslatedContent(item)
                  return (
                    <option key={item.id} value={item.id}>
                      {content.name}
                    </option>
                  )
                })}
              </select>
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
                name="search_by_Name"
              />
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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(visibleItems)].map((_, index) => (
              <div
                key={index}
                className="border-[1px] border-primary border-opacity-[0.1]"
              >
                <div className="aspect-[14/9] overflow-hidden rounded-lg bg-skeletonLoading animate-pulse max-h-[250px]">
                  <div className="w-full h-[230px] bg-skeletonLoading animate-pulse rounded-lg" />
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
              filteredDoctors.slice(0, visibleItems).map((doctor) => (
                <DoctorCard
                  key={doctor.doctor_id}
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

        {filteredDoctors.length > visibleItems && (
          <div className="mt-4 text-center mx-auto">
            <div className="inline-block pt-4">
              <LoadingButton
                className="inline-block"
                loadingTime={1000}
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
