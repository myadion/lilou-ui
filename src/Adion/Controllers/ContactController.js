import Controller from './Controller';

import ContactStore from '../Stores/ContactStore';

export default class ContactController extends Controller {
        
    constructor(init) {
        super(init)

        this.contact = ContactStore()

        console.debug("ContactController initialized")
    }

    search(query){
        const formatTeamMembers = this.formatTeamMembers(this.adion.team.members)
        const formatHistory = this.formatHistory(this.adion.call.log)

        return  {
            "query" : this.isPhoneNumber(query) ? query : null,
            "teams" : formatTeamMembers,
            "directory" : [
                {
                    name: 'Jane Doe',
                    numbers: [
                        {
                            type: 'Mobile',
                            number: '+33612345678',
                        }
                    ],
                    extension: 101,
                    presence: 'offline',
                    avatar: null
                }
            ],
            "history" : this.searchHistory(query)
        }
    }

    get finder(){
        return this.contact.finder
    }

    set finder(value){
        this.contact.finder = value
    }

    isPhoneNumber(value){
        if(value == null || value == '')
            return false
        return value.match(/^\+?[0-9]+$/) != null
    }

    formatTeamMembers(members) {
        return members.map(member => ({
            name: `${member.firstname} ${member.lastname}`,
            numbers: [
                {
                    type: member.mobile_phone_number ?'Mobile' : null,
                    number: member.mobile_phone_number ?? null,
                }
            ].filter(number => number.number),
            extension: member.exten,
            presence: member.state,
            avatar: member.avatar || null
        }));
    }

    searchHistory(query){
        // history on cherche par query dans number, extension et name puis ont supprime les doublons (meme extension ou meme nom ou meme number) puis ont prend les 10 premiers

        if(!query) return this.formatHistory(this.adion.call.log).filter((log, index, self) => index === self.findIndex((t) => (t.extension === log.extension && t.name === log.name && t.number === log.number)))
        const formatHistory = this.formatHistory(this.adion.call.log)
        return formatHistory.filter((log) => log.number == query || log.extension == query || log.name == query).filter((log, index, self) => index === self.findIndex((t) => (t.extension === log.extension && t.name === log.name && t.number === log.number)))
    }

    formatHistory(logs) {
        return logs.map(log => ({
            name: ((log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension) ? (this.adion.team.members.find(member => member.exten == (log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension))) ? this.adion.team.members.find(member => member.exten == (log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension)).firstname + ' ' + this.adion.team.members.find(member => member.exten == (log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension)).lastname : null : null),
            number: log.call_direction == 'outbound' ? log.destination_extension : log.source_extension,
            extension: log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension,
            direction: log.call_direction,
            date: log.start,
            presence: (log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension) ? (this.adion.team.members.find(member => member.exten == (log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension))) ? this.adion.team.members.find(member => member.exten == (log.call_direction == 'outbound' ? log.destination_internal_extension : log.source_internal_extension)).state : null : null,
            avatar: log.avatar || null,
        }));
    }    

}