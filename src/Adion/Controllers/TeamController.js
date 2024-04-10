import Controller from './Controller';
import ApiController from './ApiController';
import UserController from './UserController';
import PresenceController from './PresenceController';

import TeamStore from '../Stores/TeamStore';

export default class TeamController extends Controller {
        
        constructor(init) {
            super(init)

            this.api = new ApiController()
            this.user = new UserController()
            this.presence = new PresenceController()
            // this.api = this.adion.api
            // this.user = this.adion.user
            // this.presence = this.adion.presence
            
            this.team = TeamStore()

            this.getMembers()

            this.debug("TeamController initialized")
        }

        get members(){
            return this.team.members
        }

        async getMembers(){
            this.team.members = await this.api.get('/users')
            this.user.push(this.team.members.find((member) => member.uuid === this.user.me.uuid))
        }
    
        search(query){
            const normalizedQuery = this.normalizeString(query.toLowerCase());
            return this.team.members.filter((member) => {
                return (
                    (member.firstname && this.normalizeString(member.firstname).toLowerCase().includes(normalizedQuery)) ||
                    (member.lastname && this.normalizeString(member.lastname).toLowerCase().includes(normalizedQuery)) ||
                    (member.email && this.normalizeString(member.email).toLowerCase().includes(normalizedQuery)) ||
                    (member.exten && this.normalizeString(member.exten).toLowerCase().includes(normalizedQuery)) ||
                    (member.mobile_phone_number && this.normalizeString(member.mobile_phone_number).toLowerCase().includes(normalizedQuery)) ||
                    (member.status && this.normalizeString(member.status).toLowerCase().includes(normalizedQuery))
                );
            });
        }


    }