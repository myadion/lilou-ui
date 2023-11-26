import { onMounted, onUnmounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useNotifyService } from '@/stores/notify'

import { useAdionService, useWebSocket } from '@/stores/adion'

import WebRTCClient from '@wazo/sdk/lib/web-rtc-client'
import WebRTCPhone from '@wazo/sdk/lib/domain/Phone/WebRTCPhone'

export const useWebRTC = defineStore('useWebRTC', () => {

  onMounted(() => {
      useWebSocket.on('websocket-message', handleWebSocketMessage);
  });

  onUnmounted(() => {
      useWebSocket.off('websocket-message', handleWebSocketMessage);
  });

  // Adion
  const adion = useAdionService()

  // Notify
  const notify = useNotifyService()

  const config = {
      displayName: 'Kévin Paly',
      host: 'uc.adion-voip.eu',
      port: '443',
      media: {
          audio: true,
          video: true,
          localVideo: true,
      },
      iceCheckingTimeout: 1000, // Time allowed to retrieve ice candidates
      log: 2,
      audioOutputDeviceId: null, // The audio output device id (when we want to send audio in another destination).
      userAgentString: "Lilou v1",
      heartbeatDelay: 1000, // Duration in ms between 2 heartbeat (default to 2000)
      heartbeatTimeout: 5000, // Duration in ms when to consider that the Asterisk server is not responding (default to 5000)
      maxHeartbeats: 4, // Number of heatbeat send each time we want to check connection (default to 3)
      authorizationUser: 'yzp6784a', // The SIP username
      password: '159753852', // The SIP user password
      uri: 'yzp6784a', // The SIP user identity
  }

  // WebRTC Client
  const client = new WebRTCClient(config);

  // Phone Abstract Class
  const phone = new WebRTCPhone(client);

  // List of calls (active, hold)
  const active_call = reactive([])

  // List of incoming calls
  const incoming_call = reactive([])

  // List of current hold calls
  const current_hold_call = reactive([])

  // List of current sip sessions
  let sessions = []

  // const incoming_call = reactive([
  //     {
  //         id: '287d94cd-4f2a-44db-a2cc-40a02a036f80',
  //         number: '113',
  //         name: 'Jordan Carpanin',
  //         start: new Date(),
  //     },
  //     {
  //         id: '9b85e677-a715-40f7-a9fd-22ad5577cf97',
  //         number: '+336154874129',
  //         name: 'Manon Cossoul',
  //         start: new Date(),
  //     }
  // ])

  // const active_call = reactive([
  //     {
  //         id: '3d5a6199-bfc5-43ae-9632-25b2bb2fc353',
  //         number: '+33784551184',
  //         name: 'Lucie Leplat',
  //         start: new Date(),       
  //         muted: false,
  //         status: 'active', 
  //     },
  //     {
  //         id: '287d94cd-4f2a-44db-a2cc-40a02a036f80',
  //         number: '113',
  //         name: 'Jordan Carpanin',
  //         start: new Date(),
  //         muted: false,
  //         status: 'wait',
  //     }
  // ])

  client.on('invite', (session) => {
    console.log(session)
      handleInvite(session)
  })
  
  function init(){
    client.waitForRegister()
  }

  function reset(){
    return true
  }

  function handleWebSocketMessage(message) {
  }

  function handleInvite(session) {    
    sessions.push(session)
    incoming_call.push({
        id: session.id,
        number: session.remoteIdentity.displayName,
        name: session.remoteIdentity.friendlyName,
        start: new Date(),
    });
    
    session._onCancel = () => {      
        console.log('cancel')
        incoming_call.splice(incoming_call.findIndex(c => c.id === session.id), 1)
        sessions.splice(sessions.findIndex(c => c.id === session.id), 1)
    }

    session.stateChange.on(newState => {
      console.log('state', newState)

      if (newState === "Terminated") {
        active_call.splice(active_call.findIndex(c => c.id === session.id), 1)
        current_hold_call.splice(current_hold_call.findIndex(c => c.id === session.id), 1)
      }

    });

  }

  function getSession(id) {
    return sessions.find(s => s.id === id)
  }

  function removeSession(id) {
    sessions.splice(sessions.findIndex(c => c.id === id), 1)
  }

  function cleanCurrentHoldCall() {
    current_hold_call.splice(0, current_hold_call.length)
  }

  function place_all_call_on_hold() {
    active_call.forEach(c => {
        client.hold(getSession(c.id))
        c.status = 'wait'
        cleanCurrentHoldCall()
    })
  }

  function reject(call_id) {
    client.reject(getSession(call_id))

    incoming_call.splice(incoming_call.findIndex(c => c.id === call_id), 1)
    removeSession(call_id)
  }

  function answer(call_id) {
    client.answer(getSession(call_id))
    
    place_all_call_on_hold()
    cleanCurrentHoldCall()

    active_call.push(incoming_call.find(c => c.id === call_id))
    active_call.forEach(c => {
        if (c.id === call_id) {
            c.status = 'active'
        }
    })

    incoming_call.splice(incoming_call.findIndex(c => c.id === call_id), 1)
  }

  function hangup(call_id) {
    client.hangup(getSession(call_id))
    active_call.splice(active_call.findIndex(c => c.id === call_id), 1)
    cleanCurrentHoldCall()
  }

  function hold(call_id) {
    place_all_call_on_hold() 
    
    active_call.forEach(c => {
        if (c.id === call_id) {
            c.status = 'wait'
            cleanCurrentHoldCall()
            current_hold_call.push(c)
        }
    })
  }

  function unhold(call_id) {
    place_all_call_on_hold() 
    client.unhold(getSession(call_id))
    
    cleanCurrentHoldCall()
    active_call.forEach(c => {
        if (c.id === call_id) {
            c.status = 'active'
        }else{
            c.status = 'wait'
        }
    })
  }

  function mute(call_id) {
    client.mute(getSession(call_id))
    active_call.forEach(c => {
        if (c.id === call_id) {
            c.muted = true
        }
    })
  }

  function unmute(call_id) {
    client.unmute(getSession(call_id))
    active_call.forEach(c => {
        if (c.id === call_id) {
            c.muted = false
        }
    })
  }

  function dtmf(call_id, digit) {
    client.sendDTMF(getSession(call_id), digit)
  }

  function make_call(number) {
    cleanCurrentHoldCall()
    place_all_call_on_hold()
    const session = client.call(number)
    sessions.push(session)
    active_call.push({
        id: session.id,
        number: number,
        name: number,
        start: new Date(),
        muted: false,
        status: 'active', 
    });
  }
  
  return { 
      init,
      reset,
      active_call,
      incoming_call,
      current_hold_call,
      reject,
      answer,
      hangup,
      hold,
      unhold,
      dtmf,
      mute,
      unmute,
      make_call,
  }
})
export default useWebRTC;
