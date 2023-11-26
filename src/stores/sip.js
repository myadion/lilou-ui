import { defineStore } from 'pinia'
import { useNotifyService } from '@/stores/notify'

import { useAdionService, useWebSocket } from '@/stores/adion'

export const useSIP = defineStore('useSIP', () => {

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
export default useSIP;
