import Controller from './Controller';

import config from '@/Adion/config'

import WebsocketStore from '@/Adion/Stores/WebsocketStore'
import UserStore from '@/Adion/Stores/UserStore'

export default class WebsocketController extends Controller {
        
        constructor(init) {
            super(init)

            this.websocket = WebsocketStore();
            this.user = UserStore();

            this.init()

            console.debug("WebsocketController initialized")
        }
        
        get client(){
            return this.websocket.client
        }

        get events(){
            return this.websocket.events
        }
        
        init(){            
            if (this.user.connected === undefined || !this.user.connected) return;

            if (this.websocket.client && this.websocket.client.url) {
                return;
            }

            this.websocket.base = `wss://${config.WS_URL}:${config.WS_PORT}/?ck=${this.user.key}&sk=${this.user.secret}`;

            this.info("Connexion en cours", "Websocket");
            this.websocket.client = new WebSocket(this.websocket.base);

            this.websocket.client.onopen = () => {
                this.success("Connexion réussie", "Websocket")
            }

            this.websocket.client.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.emit('websocket-message', {
                    event: data.event,
                    data: data.data
                });
            };

            this.websocket.client.onclose = (e) => {
                this.websocket.destroy();

                if(!this.user.connected){
                    return;
                }

                this.warning("Connexion perdue. Reconnexion en cours...", "Websocket")
                setTimeout(this.init(), 1000); 
            }

            this.websocket.client.onerror = (error) => {
                console.error('Websocket error', error)
            }
        }

        reset(){
            this.websocket.destroy();            
            this.init();
        }

        emit(event, data){
            console.debug(event, data);
            if (!this.websocket.events[event]) return;
            this.websocket.events[event].forEach(callback => callback(data));
        }

        on(event, callback){
            if (!this.websocket.events[event]) this.websocket.events[event] = [];
            this.websocket.events[event].push(callback);
        }

}