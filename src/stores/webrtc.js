import { defineStore } from 'pinia'
import { useNotifyService } from '@/stores/notify'

import { useAdionService, useWebSocket } from '@/stores/adion'
import { WazoWebRTCClient } from '@wazo/sdk';

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

  async function init(){
    
  }

  function reset(){
    return true
  }


  function handleWebSocketMessage(message) {
  }
  
  
  return { 
      init,
      reset
  }
})
export default useWebRTC;
