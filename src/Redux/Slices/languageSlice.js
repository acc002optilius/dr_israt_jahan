import { createSlice } from "@reduxjs/toolkit";

// Load persisted language from localStorage
const loadFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem("selectedLanguage");
    return storedData ? JSON.parse(storedData) : null;
  } catch (e) {
    console.error("Error loading language from localStorage:", e);
    return null;
  }
};

// Save selected language to localStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("selectedLanguage", JSON.stringify(state));
  } catch (e) {
    console.error("Error saving language to localStorage:", e);
  }
};

// Function to get the default language from API response
const getDefaultLanguage = (languages) => {
  return languages?.find((lang) => lang.default) || languages?.[0] || null;
};

// Create Redux slice
const languageSlice = createSlice({
  name: "language",
  initialState: {
    selectedLanguage: null, // Initially null, will be updated
  },
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      saveToLocalStorage(action.payload);
    },
    setInitialLanguage: (state, action) => {
      const storedLang = loadFromLocalStorage();
      if (storedLang && !state.selectedLanguage) {
        state.selectedLanguage = storedLang; // Use stored language only if none is selected
      } else if (!state.selectedLanguage) {
        const defaultLang = getDefaultLanguage(action.payload);
        if (defaultLang) {
          state.selectedLanguage = defaultLang;
          saveToLocalStorage(defaultLang); // Save default language to localStorage
        }
      }
    }
  },
});

export const { setLanguage, setInitialLanguage } = languageSlice.actions;
export default languageSlice.reducer;
