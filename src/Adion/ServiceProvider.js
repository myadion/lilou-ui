// Dependencies
import LogHelper from '@/Adion/Helpers/LogHelper'
import config from '@/Adion/Config.json'

// Controllers
import ApiController from '@/Adion/Controllers/ApiController'
import AuthController from '@/Adion/Controllers/AuthController'
import NavigatorPermissionController from '@/Adion/Controllers/NavigatorPermissionController'
import UserController from '@/Adion/Controllers/UserController'
import WebRTCController from '@/Adion/Controllers/WebRTCController'
import WebsocketController from '@/Adion/Controllers/WebsocketController'
import TeamController from '@/Adion/Controllers/TeamController'
import PresenceController from '@/Adion/Controllers/PresenceController'
import CallController from '@/Adion/Controllers/CallController'
import CallLogController from '@/Adion/Controllers/CallLogController'


export const useServiceProvider = () => {
    return {
        
        /**
         * Define the dependencies that will be injected into the controllers
         */
        dependencies: {
            // logHelper: LogHelper,
        },

        /**
         * Define the controllers that will be used in the application
         */
        controllers: [
            {
                name: 'api',
                controller: ApiController,
                shortMethods: ['get', 'put', 'post', 'delete', 'success', 'error', 'warning', 'info']
            },
            {
                name: 'auth',
                controller: AuthController,
                shortMethods: ['login', 'logout'],
                shortData: ['connected']
            },
            {
                name: 'navigator',
                controller: NavigatorPermissionController,
            },
            {
                name: 'user',
                controller: UserController,
                shortData: ['me'],
            },
            {
                name: 'webrtc',
                controller: WebRTCController,
            },
            {
                name: 'ws',
                controller: WebsocketController,
                shortData: ['client', 'events']
            },
            {
                name: 'team',
                controller: TeamController,
            },
            {
                name: 'presence',
                controller: PresenceController,
            },
            {
                name: 'call',
                controller: CallController,
            },
            {
                name: 'callLog',
                controller: CallLogController,
            },
        ]
    }
}

export default useServiceProvider
