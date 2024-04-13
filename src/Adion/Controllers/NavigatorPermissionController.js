import Controller from './Controller';
import UserStore from '../Stores/UserStore';

export default class NavigatorPermissionController extends Controller {
    constructor(init) {
        super(init);
        
        this.user = UserStore();
        this.request()

        console.debug('NavigatorPermissionController initialized');
    }
    
    get permissionsGranted() {
        return this.user.navigatorPermissionsGranted
    }

    request() {
        return this.requestMediaPermission()
            .then(() => this.requestNotificationPermission())
            .then(() => this.requestLocationPermission())
            // .then(() => this.requestClipboardPermission())
            .then(() => {
                this.user.navigatorPermissionsGranted = true
            })
            .catch((error) => {
                console.error(error.message || "Une erreur est survenue lors de la demande de permissions.");
                this.user.navigatorPermissionsGranted = false
            });
    }

    requestMediaPermission() {
        return navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .catch(() => { throw new Error("Permission refusée pour l'accès aux médias."); });
    }

    requestLocationPermission() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, () => {
                reject(new Error("Permission refusée pour la géolocalisation."));
            });
        });
    }

    requestClipboardPermission() {
        if (!navigator.clipboard) {
            return Promise.reject(new Error("L'accès au presse-papiers n'est pas disponible."));
        }
        return navigator.permissions.query({ name: "clipboard-read" })
            .then(() => navigator.clipboard.readText())
            .catch(() => { throw new Error("Permission refusée pour l'accès au presse-papiers."); });
    }

    requestNotificationPermission() {
        if (!("Notification" in window)) {
            return Promise.reject(new Error("Les notifications ne sont pas prises en charge par ce navigateur."));
        }
        return Notification.requestPermission()
            .then((permission) => {
                if (permission !== "granted") {
                    throw new Error("Permission refusée pour les notifications.");
                }
            });
    }
}
