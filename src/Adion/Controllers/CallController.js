import Controller from './Controller';
import ApiController from './ApiController';
import CallLogController from './CallLogController';
import WebRTCController from './WebRTCController';
import TeamController from './TeamController';

import CallStore from '../Stores/CallStore';


export default class CallController extends Controller {
        
    constructor(init) {
        super(init)

        this.api = new ApiController()
        this.callLog = new CallLogController()
        this.webrtc = new WebRTCController()
        this.team = new TeamController()

        // this.api = this.adion.api
        // this.callLog = this.adion.callLog
        // this.webrtc = this.adion.webrtc
        // this.team = this.adion.team
        
        this.call = CallStore()


        this.debug("CallController initialized")
    }

    get log(){
        return this.call.log
    }

    get active(){
        return this.call.active
    }       

    new(number){
        this.webrtc.new(number)
    }

    answer(callId){
        this.webrtc.answer(callId)
    }

    hangup(callId){
        this.webrtc.hangup(callId)
    }

    reject(callId){
        this.webrtc.reject(callId)
    }

    mute(callId){        
        this.webrtc.mute(callId)
    }    

    unmute(callId){
        this.webrtc.unmute(callId)
    }

    hold(callId){
        this.webrtc.hold(callId)
    }

    unhold(callId){
        this.webrtc.unhold(callId)
    }

    dtmf(callId, digit){
        this.webrtc.sendDTMF(callId, digit)
    }

    startRecording(callId){
        this.webrtc.startRecording(callId)        
    }

    stopRecording(callId){
        this.webrtc.stopRecording(callId)            
    }

}