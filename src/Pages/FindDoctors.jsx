import React, { useEffect, useState } from 'react'
import SectionTitle from '../Layout/Title/SectionTitle'
import InputLabel from '../Layout/Input/InputLabel/InputLabel'
import UserAuthInput from '../Layout/Input/UserAuthForm/UserAuthInput'
import { getTranslation } from '../Utils/Translation/translationUtils'
import { allDepartments, doctorsApi, findDoctorsApi } from '../Api/Api'
import Container from '../Layout/Container'
import DoctorCard from '../Layout/Card/DoctorCard'
import MinTitle from '../Layout/Title/MinTitle'
import LoadingButton from '../Layout/Button/LoadingButton'
import { useSelector } from 'react-redux'

const FindDoctors = () => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  )

  const [translations, setTranslations] = useState({})
  const [visibleItems, setVisibleItems] = useState(12)
  const [departments, setDepartments] = useState([])
  const [popular_doctors, setPopularDoctors] = useState([])
  console.log(popular_doctors);
  
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search_by_Name, setSearchByName] = useState('')
  const [search_by_Department, setSearchByDepartment] = useState('')
  console.log(search_by_Department);

  const [inputErrors, setInputErrors] = useState({})

  const viewMoreDoctors = () => {
    setVisibleItems((prev) => prev + 8)
  }

  const handleChange = (field, value) => {
    if (field === 'search_by_Name') setSearchByName(value)
    if (field === 'search_by_Department') setSearchByDepartment(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const deptRes = await fetch(allDepartments)
        if (!deptRes.ok) throw new Error('Failed to fetch departments.')
        const deptData = await deptRes.json()
        setDepartments(deptData.data?.departments || [])

        const docRes = await fetch(findDoctorsApi)
        if (!docRes.ok) throw new Error('Failed to fetch doctors.')
        const docData = await docRes.json()
        setPopularDoctors(docData.data?.popular_doctors || [])

        // setTranslations(docData.data?.translations || {})
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }


    fetchData()
  }, [])

  // const fetchDoctorsByDepartment = async (search_by_Department) => {
  //   const response = await fetch(findDoctorsApi, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       department_id: search_by_Department,
  //     }),
  //   });

  //   const data = await response.json();
  //   // now you can work with `data`
  //   console.log(data);
  // };

  // fetchDoctorsByDepartment()

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

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = search_by_Name
      ? doctor.first_name?.toLowerCase().includes(search_by_Name.toLowerCase()) ||
      doctor.last_name?.toLowerCase().includes(search_by_Name.toLowerCase())
      : true

    // const matchesDept = search_by_Department
    //   ? doctor.department?.name === search_by_Department
    //   : true

    return matchesName
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

                {departments?.map((item, index) => {
                  const content = getTranslatedContent(item)
                  return (
                    <option key={index} value={content.slug}>
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
                name="search_by_Name"
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
            {popular_doctors.length ? (
              popular_doctors.slice(0, visibleItems).map((doctor) => (
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

export default FindDoctors
