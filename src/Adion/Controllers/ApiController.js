import Controller from '@/Adion/Controllers/Controller';

import config from '@/Adion/config'

import UserStore from '@/Adion/Stores/UserStore';
import axios from 'axios'

export default class ApiController extends Controller {
        
        constructor(init) {
            super(init)

            /*
            * UserStore
            */
            this.user = UserStore()

            /*
            * API Configuration
            */
            this.api =  axios.create({
                baseURL: "https://" + config.API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Api-Ak': config.API_AK
                }
            });

            /*
            * Axios Interceptors
            */
            this.api.interceptors.request.use(
                config => {
                    if(this.user.key.length > 0 && this.user.secret.length > 0) {
                        config.headers['X-Api-Ck'] = this.user.key
                        config.headers['X-Api-Sk'] = this.user.secret
                    }

                    return config
                },
                error => {
                    return Promise.reject(error)
                }
            )
            
            this.debug("ApiController initialized")
        }
    
        handleError(error) {
            throw error.response.data.message
        }

        async get(url, params = null) {
            const config = {
                params: params
            };

            return await this.api.get(url, config).then((res) => {
                return res.data;
            }).catch((error) => {
                this.handleError(error);
            });
        }
    
        async post(url, params = null) {
            return await this.api.post(url, params).then((res) => {
                return res.data
            }).catch((error) => {
                this.handleError(error)
            })
        }
    
        async put(url, params = null) {
            return await this.api.put(url, params).then((res) => {
                return res.data
            }).catch((error) => {
                this.handleError(error)
            })
        }
    
        async delete(url, params = null) {
            return await this.api.delete(url, params).then((res) => {
                return res.data
            }).catch((error) => {
                this.handleError(error)
            })
        }
}