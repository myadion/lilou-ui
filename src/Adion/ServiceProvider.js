// Dependencies
import LogHelper from '@/Adion/Helpers/LogHelper'

// Controllers
import AlertController from '@/Adion/Controllers/AlertController'
import ApiController from '@/Adion/Controllers/ApiController'

export const useServiceProvider = () => {
    return {
        
        /**
         * Define the dependencies that will be injected into the controllers
         */
        dependencies: {
            logHelper: new LogHelper()
        },

        /**
         * Define the controllers that will be used in the application
         */
        controllers: [
            {
                name: 'alert',
                controller: new AlertController(),
                shortMethods: ['success', 'error', 'info'],

                /**
                 * Define the dependencies that will be injected into this controller
                 */
                dependencies: {
                    logHelper: new LogHelper()
                }
            },
            {
                name: 'api',
                controller: new ApiController(),
                shortMethods: ['get', 'put', 'delete']
            }
        ]
    }
}

export default useServiceProvider