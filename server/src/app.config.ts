/**
 * @description App Configuration properties
 * @author Axel Galicia - axelgalicia@gmail.com
 */

const APP_PORT = process.env.LEDN_PORT ?? '3000';
const DEFAULT_ITEMS_PER_PAGE = process.env.LEDN_DEFAULT_ITEMS_PER_PAGE ?? '20';


interface IAppConfig {
    appPort: string;
    defaultItemsPerPage: string;
}


export const appConfig: IAppConfig = {
    appPort: APP_PORT,
    defaultItemsPerPage: DEFAULT_ITEMS_PER_PAGE
}