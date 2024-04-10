import LogHelper from '@/Adion/Helpers/LogHelper'
import { useNotification } from "@kyvg/vue3-notification"

import useAdion from '@/Adion'
export default class Controller {
    
    constructor(dependencies) {
        this.adion = useAdion()
        console.log(this.adion)
        const log = new LogHelper()
        this.notification = useNotification()
        this.debug = log.debug
    }

    success(message, title = "Parfait !") {
        this.notification.notify({
            title: title,
            text: message,
            type: "success",
            duration: 5000,
        });
    }

    error(message, code = 0, title = "Erreur") {
        this.notification.notify({
            title: title,
            text: ( code > 0 ? 'Code ' + code + ': ' : '') + message,
            type: "error",
            duration: 10000,
        });
    }

    warning(message, title = "Attention") {
        this.notification.notify({
            title: title,
            text: message,
            type: "warn",
            duration: 5000,
        });
    }

    info(message, title = "Information") {
        this.notification.notify({
            title: title,
            text: message,
            type: "info",
            duration: 5000,
        });
    }

    normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

}