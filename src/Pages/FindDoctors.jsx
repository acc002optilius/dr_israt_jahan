import React, { useEffect, useState } from 'react'
import SectionTitle from '../Layout/Title/SectionTitle'
import InputLabel from '../Layout/Input/InputLabel/InputLabel'
import UserAuthInput from '../Layout/Input/UserAuthForm/UserAuthInput'
import { getTranslation } from '../Utils/Translation/translationUtils'
import { allDepartments, findDoctorsApi } from '../Api/Api'
import Container from '../Layout/Container'
import DoctorCard from '../Layout/Card/DoctorCard'
import MinTitle from '../Layout/Title/MinTitle'
import LoadingButton from '../Layout/Button/LoadingButton'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { LuSearchX } from "react-icons/lu";


const FindDoctors = () => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  )

  const [translations, setTranslations] = useState({})

  const [moreDoctors, setMoreDoctors] = useState(8)
  const [morePopularDoctors, setMorePopularDoctors] = useState(12)

  const [departments, setDepartments] = useState([])
  const [popular_doctors, setPopularDoctors] = useState([])
  const [doctors, setDoctors] = useState([])

  const [loading, setLoading] = useState(true)
  const [fetchDataLoading, setFetchDataLoading] = useState(true)

  const [error, setError] = useState(null)
  const [search_by_Name, setSearchByName] = useState('')
  const [search_by_Department, setSearchByDepartment] = useState('')

  const viewMoreDoctors = () => {
    setMoreDoctors((prev) => prev + 8)
  }

  const viewMorePopularDoctors = () => {
    setMorePopularDoctors((prev) => prev + 12)
  }

  const handleChange = (field, value) => {
    if (field === 'search_by_Name') setSearchByName(value)
    if (field === 'search_by_Department') setSearchByDepartment(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (search_by_Department) return; // Skip fetching popular_doctors when filtering
      setFetchDataLoading(true)
      try {
        const deptRes = await fetch(allDepartments)
        if (!deptRes.ok) throw new Error('Failed to fetch departments.')
        const deptData = await deptRes.json()
        setDepartments(deptData.data?.departments || [])

        const docRes = await fetch(findDoctorsApi)
        if (!docRes.ok) throw new Error('Failed to fetch doctors.')
        const docData = await docRes.json()
        const popular_doctors = docData.data?.popular_doctors;
        setPopularDoctors(popular_doctors || [])

      } catch (err) {
        setError(err.message)
      } finally {
        setFetchDataLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchDoctorsByDepartment = async () => {
      if (!search_by_Department) return;
      setLoading(true);
      try {
        const response = await axios.post(findDoctorsApi, {
          slug: search_by_Department,
        });
        setDoctors(response.data?.data || []);
      } catch (err) {
        console.log("Error fetching filtered doctors", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorsByDepartment();
  }, [search_by_Department]);



  useEffect(() => {
    if (!search_by_Name) {
      setDoctors(prev => prev); // or keep it as-is
      return;
    }

    const filtered = doctors.filter((doctor) =>
      `${doctor.first_name || ""}${doctor.last_name || ""}`.toLowerCase().includes(search_by_Name.toLowerCase())
    );

    setDoctors(filtered);
  }, [search_by_Name]);


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
                    <option key={index} value={item.slug}>
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
            </div>
          </div>
        </div>
      </section>

      {/* filter doctors by Search section  */}
      <Container>
        {search_by_Department ? (
          <div className='pt-sectionSm md:pt-sectionMd lg:pt-sectionLg xl:pt-sectionLg'>
            {doctors.length !== 0 ? (
              <>
                <SectionTitle className="text-center capitalize mb-5" text="search results" />
                <MinTitle
                  className="text-center mt-2 mx-auto max-w-[570px] mb-12"
                  text={`${doctors.length} Doctors found for "${search_by_Department}" department`}
                />
              </>) : ("")}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
                {[...Array(moreDoctors)].map((_, index) => (
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
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                {doctors.length === 0 ? (<div className="col-span-full px-6 bg-white rounded-xl text-center">
                  <div className="max-w-md mx-auto">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-5">
                      <LuSearchX className="text-4xl text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      No Doctors Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any doctors matching your search criteria. Please try:
                    </p>
                  </div>
                </div>

                ) : (
                  doctors.slice(0, moreDoctors).map((doctor, index) => (
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
                )}
              </div>
            )}
            {doctors?.length > moreDoctors && (
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
          </div>
        ) : ("")}

      </Container>

      {/* popular doctors section  */}
      <Container>
        <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg'>
          <SectionTitle className="text-center capitalize mb-5" text="popular doctors" />
          <MinTitle
            className="text-center mt-2 mx-auto mb-5 max-w-[570px]"
            text="We have a team of experienced and qualified popular doctors who can provide you with the best possible care."
          />
          {fetchDataLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
              {[...Array(morePopularDoctors)].map((_, index) => (
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
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-12">
              {popular_doctors.slice(0, morePopularDoctors).map((doctor, index) => (
                <DoctorCard
                  key={index}
                  id={doctor.doctor_id}
                  firstName={doctor.first_name}
                  lastName={doctor.last_name}
                  department={doctor.department}
                  image={doctor.image}
                  socialNetworks={doctor.socialNetworks}
                />
              ))}
            </div>
          )}
          {popular_doctors?.length > morePopularDoctors && (
            <div className="mt-4 text-center mx-auto">
              <div className="inline-block pt-4">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text="Load More"
                  onClick={viewMorePopularDoctors}
                />
              </div>
            </div>
          )}
        </div>
      </Container>

    </>
  )
}

export default FindDoctors
