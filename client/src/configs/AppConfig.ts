const API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME;
const API_PORT = process.env.REACT_APP_API_PORT;
const API_SUFFIX = process.env.REACT_APP_API_SUFIX;
const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL;

type EnvVariable = string | undefined;


interface AppConfig {
    apiHostName: EnvVariable;
    apiPort: EnvVariable;
    apiSuffix: EnvVariable;
    apiUrl: EnvVariable;
    apiProtocol: EnvVariable;
}


export const appConfig: AppConfig = {
    apiHostName: API_HOSTNAME,
    apiPort: API_PORT,
    apiSuffix: API_SUFFIX,
    apiProtocol: API_PROTOCOL,
    apiUrl: `${API_PROTOCOL}://${API_HOSTNAME}:${API_PORT}/${API_SUFFIX}`
}