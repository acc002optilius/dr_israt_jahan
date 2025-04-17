import { useState } from "react";
import logo from "../../assets/logo.png";
import Container from "../../Layout/Container";
import { RiArrowDropDownLine, RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Redux/Slices/languageSlice";
import { api } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();
  const { site_logo } = useSelector(
    (state) => state.commonData?.siteCommonData
  );

  // Static menu data - replace with API call later
  const menuItems = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Find a Doctor", href: "/find-doctors", hasDropdown: false },
    { name: "About", href: "#", hasDropdown: false },
    {
      name: "Services",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Cardiology", href: "#" },
        { name: "Neurology", href: "#" },
        { name: "Pediatrics", href: "#" },
        { name: "Dermatology", href: "#" },
      ],
    },
    { name: "Doctors", href: "/doctors", hasDropdown: false },
    {
      name: "Departments",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Emergency", href: "#" },
        { name: "Surgery", href: "#" },
        { name: "Radiology", href: "#" },
        { name: "Laboratory", href: "#" },
      ],
    },
    // { name: "Blog", href: "/blogs", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
    {
      name: "More",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Blog", href: "/blogs" },
        { name: "Galarry", href: "/gallery" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "FAQ's", href: "faqs" },
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
    dispatch(setLanguage(language)); // language is the full object now
  };
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  // PAGE
  const handleGoPage = (page) => {
    navigate(page)
  }
  return (
    <header className="sticky top-0 z-50 bg-theme shadow-sm">
      <Container>
        <div className="flex justify-between  items-center ">
          <div className="w-[11%]">
            {/* Logo */}
            <a href="#" className="text-2xl font-bold text-blue-600 ">
              <div className="rounded-md px-2 py-1 bg-secondary">
                <img
                  className="w-full rounded-sm"
                  src={site_logo ? `${api}/${site_logo}` : `${logo}`}
                  alt=""
                />
              </div>
            </a>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className=" ">
              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex gap-2">
                  {menuItems.map((item) => (
                    <li
                      key={item.name}
                      className="relative "
                      onMouseEnter={() =>
                        item.hasDropdown && toggleDropdown(item.name)
                      }
                      onMouseLeave={() =>
                        item.hasDropdown && toggleDropdown(item.name)
                      }
                    >
                      <div className="flex items-center ">
                        <div
                          onClick={() => handleGoPage(item.href)}
                          className={`nav-link text-sm px-3 my-6 cursor-pointer font-medium text-secondary  transition-colors relative group ${
                            activeDropdown === item.name ? "" : ""
                          }`}
                        >
                          {item.name}
                          <span className="absolute bottom-0 left-0 w-0 h-[0.3px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
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
                            onClick={() => handleGoPage(dropdownItem.href)}
                              key={dropdownItem.name}

                              className="dropdown-link block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
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
              {/* <MdOutlineArrowDropDown /> */}
            </p>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
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

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} py-4`}
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
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded"
                          >
                            {dropdownItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded"
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
