// src/Api/Api.jsx
export const api = import.meta.env.VITE_API_BASE_URL;
export const version = import.meta.env.VITE_API_VERSION;

// Home Content Api API URL
export const homeContentApi = `${api}/${version}/home`;

// Common Data Api
export const commonDataApi = `${api}/${version}/common-data`;

// Landing Section Api
export const landingSectionDataApi = `${api}/${version}/home/landing-section`;

// Make A Appointment Api (Post)
export const makeAppointmentApi = `${api}/${version}/appointment-request/submit`;


