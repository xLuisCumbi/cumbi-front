const config = {

    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5001/api/user",
    businessUrl: import.meta.env.VITE_BUSINESS_API_URL || "http://localhost:5001/api/business",
    settingsUrl: import.meta.env.VITE_SETTINGS_API_URL || "http://localhost:5001/api/settings",
    paymentBaseUrl: import.meta.env.APPURL || "http://localhost:5001",
}
export { config };
