import { defineStore } from 'pinia';
import { ref } from 'vue';

export const SettingStore = defineStore('SettingStore', () => {

    const mediaDevices = ref({
        audio: {
            in: [],
            out: []
        },
        video: []
    })
    const selectedAudioIn = ref(null)
    const selectedAudioOut = ref(null)
    const selectedAudioRinger = ref(null)
    const selectedVideo = ref(null)
    const volumeIn = ref(1)
    const volumeOut = ref(1)
    const volumeRinger = ref(1)

    return {
        mediaDevices,
        selectedAudioIn,
        selectedAudioOut,
        selectedAudioRinger,
        selectedVideo,
        volumeIn,
        volumeOut,
        volumeRinger
    }
    
}, { persist: true });
export default SettingStore;
