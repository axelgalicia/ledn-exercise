/**
 * App Configuration properties
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

const APP_PORT = process.env.LEDN_PORT ?? '3000';
const DEFAULT_PAGE_SIZE = process.env.LEDN_DEFAULT_PAGE_SIZE ?? '20';


interface IAppConfig {
    appPort: string;
    defaultPageSize: string;
}


export const appConfig: IAppConfig = {
    appPort: APP_PORT,
    defaultPageSize: DEFAULT_PAGE_SIZE
}