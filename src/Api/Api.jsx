// src/Api/Api.jsx
const viteApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const viteApiVersion = import.meta.env.VITE_API_VERSION;

// Home Content Api API URL
export const homeContentApi = `${viteApiBaseUrl}/${viteApiVersion}/home`;

// Common Data Api
export const commonDataApi = `${viteApiBaseUrl}/${viteApiVersion}/common-data`;


