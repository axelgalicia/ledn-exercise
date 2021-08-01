/**
 * @description App Configuration properties
 * @author Axel Galicia - axelgalicia@gmail.com
 */

const APP_PORT = process.env.LEDN_PORT;


interface IAppConfig {
    appPort: string | undefined;
}


export const appConfig: IAppConfig = {
    appPort: APP_PORT,
}