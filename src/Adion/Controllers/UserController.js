import Controller from './Controller';

import UserStore from '../Stores/UserStore';

export default class UserController extends Controller {
        
        constructor(init) {
            super(init)

            this.api = this.adion.api

            this.user = UserStore();
            
            if(this.user.connected) this.getUserDetails()

            console.debug("UserController initialized")
        }

        get me(){
            return this.user.me
        }
        
        async getUserDetails(){
            this.push(await this.api.get('/me'))
            this.user.me.avatar = this.me.avatar ||  `https://ui-avatars.com/api/?color=fff&background=random&name=${this.me.firstname}+${this.me.lastname}`
        }

        push(data){
            this.user.me = {...this.user.me, ...data}
        }
}