import { Connection, createConnection } from 'typeorm';
import path from 'path';

const connectDB = async (): Promise<void> => {
    try {
        const connection: Connection = await createConnection({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: true,
            synchronize: true,
            entities: [
                path.join(__dirname, '..', '/entities/*.ts') 
            ],
            migrations: [path.join(__dirname, '..', '/migrations/*')],
        });
        if (connection) {
            console.log('Successful connection to database');
        }
    } catch (error) {
        console.log(error);
    }
};
export default connectDB;
