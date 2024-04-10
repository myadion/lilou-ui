import Controller from './Controller';
import ApiController from './ApiController';

import CallStore from '../Stores/CallStore';


export default class CallLogController extends Controller {
        
    constructor(init) {
        super(init)

        this.api = new ApiController()
        // this.api = this.adion.api
        
        this.call = CallStore()

        this.getCallLog()

        this.debug("CallLogController initialized")
    }
    
    getCallLog(limit = 500, page = 1){
        this.api.get('/history', { limit, page }).then((res) => {
            if(res.length > 0){
                this.push(res)
                this.getCallLog(limit, page + 1)
            }
        })
    }

    push(call){
        this.call.log.push(...call)
        this.call.log = this.call.log.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
    }
}