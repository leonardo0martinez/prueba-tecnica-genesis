import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 5000;


export const DB = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PWD: process.env.DB_PWD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
}

export const JWT_TOKEN = process.env.JWT_TOKEN;