import axios from 'axios';
import { config } from "../config/default";
import { authToken } from '../helpers/authHeader';

const ApiService = {

    baseURL: config.apiUrl,

    get(endpoint, params = {}) {
        
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseURL}${endpoint}`, {
                params,
                headers: {
                    Authorization: `Bearer ${authToken()}`
                }
            })
            .then(response =>  resolve(response.data), (err)=> {
                
                reject(err)

            })
        })

    },

    post(endpoint, data = {}) {
    
        return new Promise((resolve, reject) => {
            
            axios.post(`${this.baseURL}${endpoint}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken()}`
                }
            })
            .then(response => resolve(response.data), (err)=>{
                reject(err)
            })

        })

    },

    put(endpoint, data = {}) {
    
        return new Promise((resolve, reject) => {
            
            axios.put(`${this.baseURL}${endpoint}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken()}`
                }
            })
            .then(response => resolve(response.data), (err)=>{
                reject(err)
            })

        })

    },
};

export default ApiService;
