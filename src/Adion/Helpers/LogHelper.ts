/*
|--------------------------------------------------------------------------
| LogHelper
|--------------------------------------------------------------------------
|
| This helper is used to log messages to the console with a specific format.
| It is used to log messages in the Adion App.
|
*/
export default class LogHelper {
    
    error(message: string, code: string | null = null, title: string | null = null): void {
        console.error(`[adion]${code ? ` [${code}]` : ''}: ${message}`, title ? ` - ${title}` : '');
    }

    success(message: string, title: string | null = null): void {
        console.log(`[adion] ${message}`, title ? ` - ${title}` : '');
    }

    info(message: string, title: string | null = null): void {
        console.info(`[adion] ${message}`, title ? ` - ${title}` : '');
    }

    debug(message: string, title: string | null = null): void {
        console.debug(`[adion] ${message}`, title ? ` - ${title}` : '');
    }
}
