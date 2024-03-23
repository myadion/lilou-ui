import { Controller } from '@/Adion/Controllers/Controller';
import axios from 'axios'

export default class ApiController extends Controller {
        
        constructor() {
            super()
            this.api =  axios.create({
                baseURL: "https://" + this.config.API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Api-Ak': this.config.API_AK
                }
            });
        }
    
        async get(url, params = null) {
            try {
                return await this.api.get(url, params)
            } catch (error) {
                this.error(error)
            }
        }
    
        async post(url, params = null) {
            try {
                return await this.api.post(url, params)
            } catch (error) {
                this.error(error)
            }
        }
    
        async put(url, params = null) {
            try {
                return await this.api.put(url, params)
            } catch (error) {
                this.error(error)
            }
        }
    
        async delete(url, params = null) {
            try {
                return await this.api.delete(url, params)
            } catch (error) {
                this.error(error)
            }
        }
}