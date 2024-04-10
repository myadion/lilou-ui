import Controller from './Controller';
import ApiController from './ApiController';
import WebsocketController from './WebsocketController';

import config from '@/Adion/config'
import UserStore from '../Stores/UserStore';

import { useRouter } from 'vue-router'

export default class AuthController extends Controller {
        
    constructor(init) {
        super(init)

        this.api = new ApiController()
        this.websocket = new WebsocketController()
        // this.api = this.adion.api
        // this.websocket = this.adion.websocket
        
        this.user = UserStore()
        this.config = config
        this.check()

        this.debug("AuthController initialized")
    }
    
    get connected(){
        return this.user.connected
    }

    async logout(){
        this.api.delete('/auth/login').then(() => {
            this.user.connected = false
            this.websocket.reset()
        })
    }

    async login(email, password) {
        const { key, secret, acls } = await this.api.post('/auth/login', {
            email,
            password,
            realm: this.config.UC_REALM,
        })

        Object.assign(this.user, { key, secret, acls, connected: true });
        this.websocket.reset()
    }
        

    async check() {
        this.api.get('/auth/login').then((connected) => {
            this.user.connected = connected
        })
    }

    async refresh(expiration = 3600) {
        return this.api.post('/auth/renew', { expiration });
    }
}