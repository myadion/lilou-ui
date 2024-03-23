export default class LogHelper {
    
    error(message, code = null, title = null) {
        console.error(`[adion]${code ? ` [${code}]` : ''}: ${message}`, title ? ` - ${title}` : '');
    }

    success(message, title = null) {
        console.log(`[adion] ${message}`, title ? ` - ${title}` : '');
    }

    info(message, title = null) {
        console.info(`[adion] ${message}`, title ? ` - ${title}` : '');
    }
}
