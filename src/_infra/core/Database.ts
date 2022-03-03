import * as mongoose from 'mongoose'
import { config } from './Config';

export class DataBase {
    static db: typeof mongoose

    static async connect() {

        const options: mongoose.ConnectOptions = {

        }

        this.db = await mongoose.connect(config.MONGO_URL, options)

        console.log('Database connected!!!');

        return this.db
    }
}