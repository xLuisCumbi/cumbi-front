const config = {

    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5001/api/user",
    businessUrl: import.meta.env.VITE_BUSINESS_API_URL || "http://localhost:5001/api/business",
    settingsUrl: import.meta.env.VITE_SETTINGS_API_URL || "http://localhost:5001/api/settings",
    depositsUrl: import.meta.env.VITE_DEPOSIT_API_URL || "http://localhost:5001/api/deposit",
    paymentBaseUrl: import.meta.env.APPURL || "http://localhost:5001",
    countryUrl: import.meta.env.VITE_COUNTRY_API_URL || "http://localhost:5001/api/country",
    coinUrl: import.meta.env.VITE_COIN_API_URL || "http://localhost:5001/api/coin",
    bankAccountUrl: import.meta.env.VITE_BANKACCOUNT_API_URL || "http://localhost:5001/api/bankaccount",
    bankUrl: import.meta.env.VITE_BANK_API_URL || "http://localhost:5001/api/bank",
}
export { config };
