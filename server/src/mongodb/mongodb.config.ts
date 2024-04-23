/**
 *  MongoDB connection configuration.
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */


const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;


interface IMongoDBConfig {
    user: string | undefined;
    password: string | undefined;
    hostname: string | undefined;
    port: string | undefined;
    db: string | undefined;
}

export const mongoDBConfig: IMongoDBConfig = {
    hostname: MONGO_HOSTNAME,
    port: MONGO_PORT,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    db: MONGO_DB
  };