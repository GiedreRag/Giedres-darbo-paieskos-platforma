import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';

async function dbSetup() {
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    await usersTable(connection);

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname varchar(60) NOT NULL,
                        email varchar(60) NOT NULL,
                        password_hash varchar(100) NOT NULL,
                        isBlocked tinyint(1) NOT NULL DEFAULT 0,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create users table.");
        console.log(error);
        throw error;
    }
}

export const connection = await dbSetup();