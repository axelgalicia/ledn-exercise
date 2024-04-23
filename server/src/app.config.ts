/**
 * App Configuration properties
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

const APP_PORT = process.env.PORT;
const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE;

type EnvVariable = string | undefined;

interface IAppConfig {
    appPort: EnvVariable;
    defaultPageSize: EnvVariable;
}


export const appConfig: IAppConfig = {
    appPort: APP_PORT,
    defaultPageSize: DEFAULT_PAGE_SIZE
}