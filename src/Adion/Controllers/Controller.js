import useTrucStore from '@/Adion/Stores/TrucStore'
import LogHelper from '@/Adion/Helpers/LogHelper'
import config from '@/Adion/Config.json'

export class Controller {
    constructor() {
        this.config = config

        this.store = useTrucStore()
        
        this.log = new LogHelper
        // this.log = new dependencies.logHelper
        this.error = this.log.error
        this.success = this.log.success
        this.info = this.log.info
    }
    // injecDependencies(dependencies){
    //     this.dependencies = dependencies
    //     console.log(this.dependencies)
    // }

}