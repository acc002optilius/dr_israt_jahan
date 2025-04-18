import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import Container from "../../Layout/Container";
import { RiArrowDropDownLine, RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Redux/Slices/languageSlice";
import { allDepartments, allServicesApi, api } from "../../Api/Api";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [services , setServices] = useState([])
  const [department , setDepartment] = useState([])
  useEffect(() => {
    const fetchAllData = async () => {
      try {

        // Fetch all data in parallel
        const [serviceResponse, departmentResponse] =
          await Promise.all([
            axios.get(allServicesApi),
            axios.get(allDepartments),
          ]);
          console.log(departmentResponse);
          
        setServices(serviceResponse.data.data.services);
        setDepartment(departmentResponse.data.data.departments);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };

    fetchAllData();

    return () => {
      // setIsLoading(false);
    };
  }, []);
  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       // Fetch all data in parallel
  //       const response = await axios.get(allServicesApi);
  //       setServices(response.data.data.services)
        
  //       // setSiteVisitors(response.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //     }
  //   };
  //   fetchAllData();
  // }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();
  const { site_logo } = useSelector(
    (state) => state.commonData?.siteCommonData
  );

  // Close dropdowns when location changes
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  const menuItems = [
    { name: "Home", slug: "/", hasDropdown: false },
    { name: "Find a Doctor", slug: "/find-doctors", hasDropdown: false },
    { name: "About", slug: "/about-us", hasDropdown: false },
    {
      name: "Services",
      slug: "#",
      hasDropdown: true,
      dropdownItems: services.map(service => ({
        ...service,
        slug: `/service/${service.slug}` // Add service path prefix
      }))
    },
    { name: "Doctors", slug: "/doctors", hasDropdown: false },
    {
      name: "Departments",
      slug: "#",
      hasDropdown: true,
      dropdownItems: department.map(dept => ({
        ...dept,
        slug: `/department/${dept.slug}` // Add department path prefix
      }))
    },
    { name: "Contact", slug: "/contact", hasDropdown: false },
    {
      name: "More",
      slug: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Blog", slug: "/blogs" },
        { name: "Galarry", slug: "/gallery" },
        { name: "Case Studies", slug: "/case-studies" },
        { name: "FAQ's", slug: "/faqs" },
      ],
    },
  ];


  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const { site_languages } = useSelector(
    (state) => state.commonData.siteCommonData
  );
  const handleLanguageSelect = (language) => {
    dispatch(setLanguage(language));
  };
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const handleGoPage = (page) => {
    setActiveDropdown(null); // Close any open dropdowns before navigating
    navigate(page);
  };

  const isActive = (slug) => {
    if (slug === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(slug) && slug !== "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-theme shadow-sm">
      <Container>
        <div className="flex justify-between items-center">
          <div className="w-[11%]">
            <a slug="/" className="text-2xl font-bold text-blue-600">
              <div className="rounded-md px-2 py-1 bg-secondary">
                <img
                  className="w-full rounded-sm"
                  src={site_logo ? `${api}/${site_logo}` : `${logo}`}
                  alt=""
                />
              </div>
            </a>
          </div>
          <div className="lg:flex justify-between items-center gap-2 hidden lg:block">
            <div className="">
              <nav className="hidden md:block">
                <ul className="flex gap-2">
                  {menuItems.map((item) => (
                    <li
                      key={item.name}
                      className="relative"
                      onMouseEnter={() =>
                        item.hasDropdown && toggleDropdown(item.name)
                      }
                      onMouseLeave={() =>
                        item.hasDropdown && toggleDropdown(item.name)
                      }
                    >
                      <div className="flex items-center">
                        <div
                          onClick={() => handleGoPage(item.slug)}
                          className={`nav-link text-sm px-3 my-6 cursor-pointer font-medium text-secondary transition-colors relative group ${
                            isActive(item.slug) ? "border-b-[1px] border-secondary" : ""
                          }`}
                        >
                          {item.name}
                          {!isActive(item.slug) && (
                            <span className="absolute bottom-0 left-0 w-0 h-[0.3px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                          )}
                        </div>
                        {item.hasDropdown && (
                          <IoIosArrowDown
                            className={`text-secondary pt-[2px] ml-0 transition-transform duration-200 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>

                      {item.hasDropdown && (
                        <div
                          className={`dropdown absolute left-0 w-56 bg-white shadow-lg rounded-md py-2 z-50 transition-all duration-300 ${
                            activeDropdown === item.name
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-[-10px] pointer-events-none"
                          }`}
                        >
                          {item.dropdownItems?.map((dropdownItem) => (
                            <div
                              onClick={() => handleGoPage(dropdownItem.slug)}
                              key={dropdownItem.name}
                              className={`dropdown-link block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer ${
                                isActive(dropdownItem.slug) ? "bg-blue-50 text-blue-600" : ""
                              }`}
                            >
                              {dropdownItem.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <p className="text-sm cursor-pointer px-2 py-1 rounded-sm flex items-center gap-1">
              {site_languages?.map((lang, index) => {
                const isSelected =
                  lang.lang_code === selectedLanguage?.lang_code;
                return (
                  <span
                    key={lang.lang_code}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`hover:underline tralsition-all duration-300 ${
                      isSelected ? "text-[#ccc]" : "text-secondary"
                    }`}
                  >
                    {lang.language === "English" ? "Eng" : "বাংলা"}
                    {index === 0 ? " | " : ""}
                  </span>
                );
              })}
            </p>
          </div>

          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"} py-4`}
        >
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.hasDropdown ? (
                  <details className="group">
                    <summary className="flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded cursor-pointer list-none">
                      <span>{item.name}</span>
                      <svg
                        className="w-4 h-4 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <ul className="pl-4 mt-1 space-y-1">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <li key={dropdownItem.name}>
                          <a
                            slug={dropdownItem.slug}
                            className={`block px-3 py-2 ${
                              isActive(dropdownItem.slug)
                                ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600"
                                : "text-gray-600 hover:bg-blue-50"
                            } rounded`}
                          >
                            {dropdownItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a
                    slug={item.slug}
                    className={`block px-3 py-2 ${
                      isActive(item.slug)
                        ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600"
                        : "text-gray-700 hover:bg-blue-50"
                    } rounded`}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;