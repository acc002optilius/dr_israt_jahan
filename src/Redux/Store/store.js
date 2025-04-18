import { configureStore } from "@reduxjs/toolkit";
import  commonDataSlice  from "../Slices/siteCommonData";
import  languageReducer  from "../Slices/languageSlice";


export const store = configureStore({
    reducer: {
      commonData : commonDataSlice,
      language : languageReducer ,
    },
  });


