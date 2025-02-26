import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"

 dotenv.config()


 export const db = new Sequelize( process.env.database_url ,{
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: false,
           
        }
    }
 })