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


//Find Doctors Api (GET)
export const findDoctorsApi = `${api}/${version}/doctors/find`;


//Subscription Api (GET)
export const subscriptionApi = `${api}/${version}/subscribe`;

//Contact Page Api (GET)
export const contactPageApi = `${api}/${version}/contact`;

//Contact Form Data Api (GET)
export const contactFormApi = `${api}/${version}/service-query/submit`;

//Single Department Api (GET)
export const singleDepartmentApi = `${api}/${version}/department?slug`;

