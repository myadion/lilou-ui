import { Controller } from '@/Adion/Controllers/Controller';

export default class AlertController extends Controller {
    
    error(message, code = null, title = null) {
        // this.error(message, code, title)
    }

    success(message, title = null) {
        console.log(message)
        // this.success(message, title)
    }

    info(message, title = null) {
        // this.info(message, title)
    }
}
