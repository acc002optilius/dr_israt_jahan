import { createSlice } from "@reduxjs/toolkit";

// Helper to load and save data to/from localStorage
const loadFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error(`Failed to load "${key}" from localStorage:`, err);
    return [];
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error(`Failed to save "${key}" to localStorage:`, err);
  }
};

// Initial state with data loaded from localStorage
const initialState = {
  siteCommonData: loadFromLocalStorage("siteCommonData"),
};

// Create slice for promotional data
const siteCommonDataSlice = createSlice({
  name: "siteCommonData",
  initialState,
  reducers: {
    setSiteCommonData(state, action) {
      state.siteCommonData = action.payload;

      // Save updated data to localStorage
      saveToLocalStorage("siteCommonData", action.payload);
    },
  },
});

// Export the action and reducer
export const { setSiteCommonData } = siteCommonDataSlice.actions;
export default siteCommonDataSlice.reducer;
