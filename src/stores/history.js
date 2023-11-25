import { onMounted, onUnmounted, ref } from 'vue'

import { defineStore } from 'pinia'
import { useNotifyService } from '@/stores/notify'

import { useAdionService, useWebSocket } from '@/stores/adion'

export const useHistoryStore = defineStore('useHistoryStore', () => {

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

  const currentPage = ref(1);
  const limit = 20;
  const noMoreHistory = ref(false);

  // cdr
  const cdr = ref([])

  async function init(){
    cdr.value = await adion.get(`/history?limit=${limit}&page=${currentPage.value}`);
    while(!noMoreHistory.value) {
      await loadMoreHistory();
    }
  }

  function reset(){
    cdr.value = []
    return true
  }

  async function loadMoreHistory(){
    const nextPage = currentPage.value + 1;
    const newCdr = await adion.get(`/history?limit=${limit}&page=${nextPage}`);

    if(newCdr.length > 0) {
      cdr.value = [...cdr.value, ...newCdr];
      currentPage.value = nextPage;
    } else {
      noMoreHistory.value = true;
    }
  }

  function handleWebSocketMessage(message) {
    // switch(message.event){
    //   case 'chatd_presence_updated':
    //     updatePresence(message.data)
    //   break
    // }
  }
  
  function updateHistory(data) {
    // const index = members.value.findIndex(member => member.uuid === user.uuid);
    // if (index !== -1) {
    //   members.value[index] = { ...members.value[index], ...user };
    // }
  }
  
  return { 
      init,
      reset,
      cdr
  }
})
export default useHistoryStore;
