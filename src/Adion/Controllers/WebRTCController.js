import Controller from './Controller'

import config from '@/Adion/config'

import UserStore from '../Stores/UserStore'
import CallStore from '../Stores/CallStore'
import WebRTCStore from '../Stores/WebRTCStore'

import WebRTCClient from '@wazo/sdk/lib/web-rtc-client'
import WebRTCPhone from '@wazo/sdk/lib/domain/Phone/WebRTCPhone'


export default class WebRTCController extends Controller {
        
        constructor(init) {
            super(init)

            this.api = this.adion.api
            this.user = UserStore()
            this.call = CallStore()
            this.webrtc = WebRTCStore()

            this.init()

            console.debug("WebRTCController initialized")
        }

            
        get config(){
            return {
                displayName: this.user.me.firstname + ' ' + this.user.me.lastname,
                host: this.user.sip.host,
                port: this.user.sip.port,
                media: {
                    audio: true,
                    video: true,
                    localVideo: true,
                },
                log: 1,
                userAgentString: config.USER_AGENT,
                iceCheckingTimeout: 1000, // Durée autorisée pour récupérer les candidats ICE.
                audioOutputDeviceId: null, // L'identifiant du périphérique de sortie audio (lorsque nous voulons envoyer l'audio vers une autre destination).
                heartbeatDelay: 1000, // Durée en ms entre 2 battements de cœur (par défaut à 2000).
                heartbeatTimeout: 5000, // Durée en ms pour considérer que le serveur Asterisk ne répond pas (par défaut à 5000).
                maxHeartbeats: 4, // Nombre de battements de cœur envoyés à chaque fois que nous voulons vérifier la connexion (par défaut à 3).
                authorizationUser: this.user.sip.username, // Le nom d'utilisateur SIP.
                password: this.user.sip.password, // Le mot de passe de l'utilisateur SIP.
                uri: this.user.sip.username, // L'identité de l'utilisateur SIP.
            }
        }

        get client(){
            return this.webrtc.client
        }

        get sessions(){
            return this.webrtc.sessions
        }

        get phone(){
            return this.webrtc.phone
        }

        init(){
            // if (this.webrtc.client) return

            const client = new WebRTCClient(this.config);
            this.webrtc.client = client;

            client.on('invite', (session) => {
                
                this.call.active.incoming.push({
                    id: session.id,
                    number: session.remoteIdentity.displayName,
                    name: session.remoteIdentity.friendlyName,
                    start: new Date(),
                    muted: false,
                    hold: false,
                    recording: false,
                })

                this.handleInvite(session)
            })

        }


        handleInvite(session) {
            console.log('invite', session)
            this.webrtc.sessions.push(session)

            session._onCancel = () => {
                this.handleCancel(session)
            }

            session.stateChange.on(newState => {
                this.handleStateChange(session, newState)
            })
        }

        handleCancel(session){
            console.error('cancel', session)
            this.removeCall(session.id)
        }

        handleStateChange(session, newState){

            if (newState === "Terminated") {                  
                this.removeCall(session.id)
            }
        }

        getSession(callId){
            console.log(this.webrtc.sessions.find(s => s.id === callId), this.webrtc.sessions)
            return this.webrtc.sessions.find(s => s.id === callId)
        }

        removeSession(callId){
            this.webrtc.sessions.splice(this.webrtc.sessions.findIndex(c => c.id === callId), 1)
        }

        sendDTMF(callId, digit){
            this.webrtc.client.sendDTMF(this.getSession(callId), digit)            
        }

        mute(callId){
            this.webrtc.client.mute(this.getSession(callId))
            this.changeCallMuted(callId, true)
        }

        unmute(callId){
            this.webrtc.client.unmute(this.getSession(callId))
            this.changeCallMuted(callId, false)
        }

        new(number){
            
            //TODO: c'est un quick fix pour le moment 
            this.adion.finder = false
            // if(!this.webrtc.client.isRegistered()){
            //     setTimeout(() => {
            //         this.new(number)
            //     }, 1000)
            // }
            
            this.hold()
            const session = this.webrtc.client.call(number)
            this.webrtc.sessions.push(session)
            this.call.active.talking.push({
                id: session.id,
                number: number,
                name: number,
                start: new Date(),
                muted: false,
                hold: false,
                recording: false,
            })

            this.handleInvite(session)
        }

        answer(callId){
            this.hold()
            this.webrtc.client.answer(this.getSession(callId))
            this.moveCall(callId, 'talking')
        }

        reject(callId){
            this.webrtc.client.reject(this.getSession(callId))
            this.removeCall(callId)
        }

        hangup(callId){
            this.webrtc.client.hangup(this.getSession(callId))
            this.removeCall(callId)
        }
        
        hold(callId = null){
            if(callId === null){
                this.call.active.talking.forEach(c => {
                    this.hold(c.id)
                })
                return
            }
            
            this.webrtc.client.hold(this.getSession(callId))
            this.changeCallHold(callId, true)
            this.moveCall(callId, 'hold')
        }

        unhold(callId){
            this.webrtc.client.unhold(this.getSession(callId))
            this.changeCallHold(callId, false)
            this.changeCallMuted(callId, false)            
            this.moveCall(callId, 'talking')
        }

        startRecording(callId){
            this.changeCallRecording(callId, true)
        }

        stopRecording(callId){
            this.changeCallRecording(callId, false)
        }
        
        changeCallStatus(callId, status){
            for (const category of this.call.categories) {
                this.call.active[category].forEach(c => {
                    if (c.id === callId) {
                        c.status = status
                    }
                })
            }
        }

        changeCallMuted(callId, muted){
            for (const category of this.call.categories) {
                this.call.active[category].forEach(c => {
                    if (c.id === callId) {
                        c.muted = muted
                    }
                })
            }
        }

        changeCallHold(callId, hold){
            for (const category of this.call.categories) {
                this.call.active[category].forEach(c => {
                    if (c.id === callId) {
                        c.hold = hold
                    }
                })
            }
        }

        changeCallRecording(callId, recording){
            for (const category of this.call.categories) {
                this.call.active[category].forEach(c => {
                    if (c.id === callId) {
                        c.recording = recording
                    }
                })
            }
        }

        getCall(callId){
            for (const category of this.call.categories) {
                for (const call of this.call.active[category]) {
                    if (call.id === callId) {
                        return call
                    }
                }
            }
        }

        moveCall(callId, to) {
            for (const category of this.call.categories) {
                const callIndex = this.call.active[category].findIndex(call => call.id === callId);
                if (callIndex !== -1) {
                    const [call] = this.call.active[category].splice(callIndex, 1);
                    this.call.active[to].push(call);
                    return;
                }
            }
        }

        removeCall(callId){
            this.removeSession(callId)
            for (const category of this.call.categories) {
                const callIndex = this.call.active[category].findIndex(call => call.id === callId);
                if (callIndex !== -1) {
                    this.call.active[category].splice(callIndex, 1);
                    return;
                }
            }
        }

    }