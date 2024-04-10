import Controller from './Controller';
import ApiController from './ApiController';
import WebsocketController from './WebsocketController';
import UserController from './UserController';

import { TeamStore } from '../Stores/TeamStore';
import { PresenceStore } from '../Stores/PresenceStore';

export default class PresenceController extends Controller {
        
        constructor(init) {
            super(init)

            this.api = new ApiController()
            this.ws = new WebsocketController()
            this.user = new UserController()
            // this.api = this.adion.api
            // this.ws = this.adion.ws
            // this.user = this.adion.user

            this.team = TeamStore()
            this.presence = PresenceStore()
            this.ws.on('websocket-message', this.handleWs.bind(this));

            this.debug("PresenceController initialized")
        }

        get type(){
            return this.presence.type
        }

        state(uuid = this.user.me.uuid){
            if(!this.team.members.length) return this.presence.type.find((type) => type.value === 'offline')
            
            const user = this.team.members.find((member) => member.uuid === uuid)
            console.log(user)

            if (user.do_not_disturb){        
                return this.presence.type.find((type) => type.value === 'dnd')
            }

            return this.presence.type.find((type) => type.value === user.state)
        }

        handleWs(message){
            switch(message.event){
                case 'chatd_presence_updated':
                    this.update(message.data)
                break
            }
        }

        update(user){
            let index = this.team.members.findIndex((member) => member.uuid === user.uuid)
            this.team.members[index] = {...this.team.members[index], ...user}

            if(this.user.me.uuid === user.uuid) this.user.push(user)
        }
    }