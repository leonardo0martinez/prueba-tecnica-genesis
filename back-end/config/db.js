import mysql from 'mysql2/promise.js';
import { DB } from './env.js';

// CONEXION CON LA BASE DE DATOS
export const pool = mysql.createPool({
    host: DB.DB_HOST,
    user: DB.DB_USER,
    password: DB.DB_PWD,
    database: DB.DB_NAME,
    port: DB.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});