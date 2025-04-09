/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        lg: "1140px",
        xl: "1320px",
      },
      screens: {
        xs: "380px", // Extra small devices
        sm: "576px", // Small devices
        md: "768px", // Medium devices
        lg: "992px", // Large devices
        xl: "1200px", // Extra large devices
        "2xl": "3080px", // Extra large devices
      },
      colors: {
        theme: "#8832DF", // Website Theme Color
        themeDeep : "#006EE5",
        themeLight : "#E5F2FF", // for light theme background color
        primary: "#424242", // Text Like black
        secondary: "#fff", // text White
        static : "#000",
        footerBg : "#4C4C4C",
        borderColor : "#dddddd",
        buttonHover : "transparent",
        skeletonLoading : "#cbd5e1"
      },
      padding: {
        'sectionSm': '30px',
        'sectionMd': '40px',
        'sectionLg': '80px',
        'sectionXl' : "30px"
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      keyframes: {
        bounceSide: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10px)' },
        },
      },
      animation: {
        bounceSide: 'bounceSide 0.8s ease-in-out infinite',
      },
      boxShadow: {
        primary: "0px 0px 3px 0px ", // Add your custom shadow here
      },
    },
  },
  plugins: [],
}