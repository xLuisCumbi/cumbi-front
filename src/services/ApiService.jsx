import axios from 'axios';
import { config } from '../config/default';
import { authToken } from '../helpers/authHeader';

const ApiService = {
  // Base URL for API endpoints
  baseURL: config.apiUrl,

  /**
   * Sends a GET request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {Object} params - The query parameters for the GET request.
   * @returns {Promise<Object>} - The response data.
   */
  get(endpoint, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseURL}/${endpoint}`, {
          params,
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  /**
   * Sends a POST request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {Object} data - The payload for the POST request.
   * @returns {Promise<Object>} - The response data.
   */
  post(endpoint, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      // Determina si los datos son un objeto FormData
      const isFormData = data instanceof FormData;

      // Configura los encabezados, excluyendo 'Content-Type' si los datos son FormData
      const config = {
        headers: {
          Authorization: `Bearer ${authToken()}`,
          ...headers,
        },
      };

      // Si los datos son FormData, elimina el encabezado 'Content-Type' para permitir que Axios lo establezca automáticamente
      if (isFormData) {
        delete config.headers['Content-Type'];
      }

      axios
        .post(`${this.baseURL}${endpoint}`, data, config)
        .then(
          (response) => {
            if (response && response.data) {
              resolve(response.data);
            } else {
              reject(new Error('Response or response data is undefined'));
            }
          },
          (err) => {
            reject(err);
          },
        )
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
 * Sends a PUT request to the specified endpoint.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} data - The payload for the PUT request.
 * @returns {Promise<Object>} - The response data.
 */
  put(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.baseURL}${endpoint}`, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  delete(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.baseURL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  // Business
  getBusiness(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.businessUrl + endpoint, {

          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  postBusiness(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.businessUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  putBusiness(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(config.businessUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  // SETTING
  getSetting(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.settingsUrl + endpoint, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  postSetting(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.settingsUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  /**
   * Sends a POST request with credentials to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {Object} data - The payload for the POST request.
   * @param {Object} additionalHeaders - Any additional headers for the request.
   * @returns {Promise<Object>} - The response data.
   */
  postWithCredentials(endpoint, data = {}, additionalHeaders = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseURL}${endpoint}`, data, {
          headers: {
            ...additionalHeaders,
          },
          withCredentials: true,
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  // updateMnemonic(endpoint, data = {}) {
  //   return new Promise((resolve, reject) => {
  //     ;
  //     axios
  //       .post(config.settingsUrl + endpoint, data, {
  //         headers: {
  //           Authorization: `Bearer ${authToken()}`,
  //         },
  //       })
  //       .then(
  //         (response) => resolve(response.data),
  //         (err) => {
  //           reject(err);
  //         }
  //       );
  //   });
  // },

  postDeposit(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.depositsUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  // Bank Account
  getBank(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.bankUrl + endpoint, {

          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  postBank(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.bankUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  putBank(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(config.bankUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  // Bank Account
  getBankAccount(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.bankAccountUrl + endpoint, {

          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  postBankAccount(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.bankAccountUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  putBankAccount(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(config.bankAccountUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  // Country
  getCountry(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.countryUrl + endpoint, {

          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  postCountry(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.countryUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  putCountry(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(config.countryUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  // Coin
  getCoin(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.coinUrl + endpoint, {

          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  postCoin(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.coinUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  putCoin(endpoint, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(config.coinUrl + endpoint, data, {
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        })
        .then(
          (response) => resolve(response.data),
          (err) => {
            reject(err);
          },
        );
    });
  },

  publicSignUp(data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.baseURL}/public-signup`, data) // Aquí envías un objeto JSON
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /**
   *
   * Update user profile
   * @param {*} userData
   * @param {*} newProfileData
   * @returns
   */
  postUpdateProfile(user, newProfileData) {
    return new Promise((resolve, reject) => {

      newProfileData.append('authToken', user.authToken);

      // Configura los encabezados
      const config = {
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      };

      axios
        .post(`${this.baseURL}/update-profile`, newProfileData, config)
        .then(
          (response) => {
            if (response && response.data) {
              resolve(response.data);
            } else {
              reject(new Error('Response or response data is undefined'));
            }
          },
          (err) => {
            reject(err);
          },
        )
        .catch((err) => {
          reject(err);
        });
    });
  },
};


export default ApiService;
