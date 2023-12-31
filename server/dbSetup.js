import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';
import { hash } from './lib/hash.js';

const database_reset = false;

async function dbSetup() {
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    if (database_reset) {
        await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    }

    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    if (database_reset) {
        await rolesTable(connection);
        await usersTable(connection);
        await tokensTable(connection);
        await citiesTable(connection);
        await postersTable(connection);

        await generateRoles(connection);
        await generateUsers(connection);
        await generateCities(connection);
        await generatePosters(connection);
    }

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname varchar(60) NOT NULL,
                        email varchar(60) NOT NULL,
                        password_hash varchar(200) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        is_Blocked tinyint(1) NOT NULL DEFAULT 0,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create users table.");
        console.log(error);
        throw error;
    }
}

async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        token varchar(40) NOT NULL,
                        user_id int(10) NOT NULL,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create tokens table.");
        console.log(error);
        throw error;
    }
}

async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(15) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create roles table.");
        console.log(error);
        throw error;
    }
}

async function citiesTable(db) {
    try {
        const sql = `CREATE TABLE cities (
                        id int(3) NOT NULL AUTO_INCREMENT,
                        title varchar(30) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create cities table.");
        console.log(error);
        throw error;
    }
}

async function postersTable(db) {
    try {
        const sql = `CREATE TABLE posters (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        img varchar(200) NOT NULL,
                        company varchar(40) NOT NULL,
                        profession varchar(50) NOT NULL,
                        title varchar(60) NOT NULL,
                        city_id int(3) NOT NULL,
                        salary decimal(6,2) unsigned DEFAULT 0.00,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        KEY city_id (city_id),
                        CONSTRAINT posters_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
                        CONSTRAINT posters_ibfk_2 FOREIGN KEY (city_id) REFERENCES cities (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create posters table.");
        console.log(error);
        throw error;
    }
}

async function generateRoles(db) {
    try {
        const sql = `INSERT INTO roles (role) VALUES ('admin'), ('seller');`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create roles into a role' table.");
        console.log(error);
        throw error;
    }
}

async function generateUsers(db) {
    try {
        const sql = `INSERT INTO users (fullname, email, password_hash, role_id) 
                    VALUES ('Jonas Jonaitis', 'jonas@jonas.lt', '${hash('jonas@jonas.lt')}', 1),
                     ('Ona Onaite', 'ona@ona.lt', '${hash('ona@ona.lt')}', 2),
                     ('Lukas Lukaitis', 'lukas@lukas.lt', '${hash('lukas@lukas.lt')}', 2);`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create users into a users' table.");
        console.log(error);
        throw error;
    }
}

async function generateCities(db) {
    try {
        const sql = `INSERT INTO cities (title) VALUES ('Vilnius'), ('Kaunas'), ('Klaipeda'), ('Panevezys'), ('Siauliai');`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create cities into a cities' table.");
        console.log(error);
        throw error;
    }
}

async function generatePosters(db) {
    try {
        const sql = `INSERT INTO posters (user_id, img, company, profession, title, city_id, salary) VALUES 
        ('2', 'http://localhost:3001/images/poster/poster_1694267980969.jpg', 'Panda co.', 'Programuotojas', 'Programuotojo be patirties', '2', '900'), 
        ('3', 'http://localhost:3001/images/poster/poster_1694268042203.png', 'Penguin co.', 'IT', 'Patyrusio IT specialisto', '1', '2500'), 
        ('2', 'http://localhost:3001/images/poster/poster_1694268195044.jpg', 'Panda co.', 'Programuotojas', 'JavaSript specialisto', '2', '3000');`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create posters into a posters' table.");
        console.log(error);
        throw error;
    }
}

export const connection = await dbSetup();