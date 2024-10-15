import Controller from './Controller';

import { SettingStore } from '../Stores/SettingStore';

export default class SettingController extends Controller {
        
        constructor(init) {
            super(init)

            this.api = this.adion.api
            this.settings = SettingStore()

            this.initMediaDevices()
            this.defineDefaultSettings()

            console.debug("SettingController initialized")
        }

        get mediaDevices(){
            return this.settings.mediaDevices
        }

        get selectedAudioIn(){
            return this.settings.selectedAudioIn
        }

        set selectedAudioIn(value){
            this.settings.selectedAudioIn = value
        }

        get selectedAudioOut(){
            return this.settings.selectedAudioOut
        }

        set selectedAudioOut(value){
            this.settings.selectedAudioOut = value
        }

        get selectedAudioRinger(){
            this.settings.selectedAudioRinger
        }

        set selectedAudioRinger(value){
            this.settings.selectedAudioRinger = value
        }

        get selectedVideo(){
            return this.settings.selectedVideo
        }

        set selectedVideo(value){
            this.settings.selectedVideo = value
        }

        get volumeIn(){
            return this.settings.volumeIn
        }

        set volumeIn(value){
            this.settings.volumeIn = value
        }

        get volumeOut(){
            return this.settings.volumeOut
        }

        set volumeOut(value){
            this.settings.volumeOut = value
        }

        get volumeRinger(){
            this.settings.volumeRinger
        }

        set volumeRinger(value){
            this.settings.volumeRinger = value
        }

        initMediaDevices(value = null){            
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                this.settings.mediaDevices.audio.in = devices.filter((device) => device.kind === 'audioinput')
                this.settings.mediaDevices.audio.out = devices.filter((device) => device.kind === 'audiooutput')
                this.settings.mediaDevices.video = devices.filter((device) => device.kind === 'videoinput')
            })
        }

        defineDefaultSettings(){
            if(this.settings.selectedAudioIn === null) this.settings.selectedAudioIn = "default"
            if(this.settings.selectedAudioOut === null) this.settings.selectedAudioOut = "default" 
            if(this.settings.selectedAudioRinger === null) this.settings.selectedAudioRinger = "default"
            if(this.settings.selectedVideo === null) this.settings.selectedVideo = "default"
        }        
}