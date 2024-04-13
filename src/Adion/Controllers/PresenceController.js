import Controller from './Controller';

import { PresenceStore } from '../Stores/PresenceStore';
export default class PresenceController extends Controller {
        
        constructor(init) {
            super(init)

            this.api = this.adion.api
            this.ws = this.adion.ws
            this.user = this.adion.user
            this.team = this.adion.team

            this.presence = PresenceStore()
            this.ws.on('websocket-message', this.handleWs.bind(this));

            console.debug("PresenceController initialized")
        }

        get type(){
            return this.presence.type
        }

        state(uuid = this.user.me.uuid){
            if(!this.team.members.length) return this.presence.type.find((type) => type.value === 'offline')
            
            const user = this.team.members.find((member) => member.uuid === uuid)

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