import express from 'express';
import { connection } from '../dbSetup.js';

export const posters = express.Router();

posters.post('/', async (req, res) => {
    const { role, id } = req.user;

    if (role !== 'seller') {
        return res.status(401).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    const { img, company, profession, title, city, salary } = req.body;

    if (!img) {
        return res.status(400).json({
            status: 'err',
            msg: 'Poster could not be created. Provide "image" value.',
        });
    }

    if (!company) {
        return res.status(400).json({
            status: 'err',
            msg: 'Poster could not be created. Provide "company" value.',
        });
    }

    if (!title) {
        return res.status(400).json({
            status: 'err',
            msg: 'Poster could not be created. Provide "title" value.',
        });
    }

    if (!profession) {
        return res.status(400).json({
            status: 'err',
            msg: 'Poster could not be created. Provide "profession" value.',
        });
    }

    if (!city) {
        return res.status(400).json({
            status: 'err',
            msg: 'Poster could not be created. Provide "city" value.',
        });
    }

    if (!salary) {
        return res.status(400).json({
            status: 'err',
            msg: 'Poster could not be created. Provide "salary" value.',
        });
    }

    try {
        const cityQuery = `SELECT id FROM cities WHERE title = ?`;
        const cityRes = await connection.execute(cityQuery, [city]);
        const cityResArray = cityRes[0];

        if (cityResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'City value is invalid.',
            });
        }

        const cityId = cityResArray[0].id;

        const insertQuery = `INSERT INTO posters
            (user_id, img, company, profession, title, city_id, salary)
            VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const insertRes = await connection.execute(insertQuery,
            [id, img, company, profession, title, cityId, salary]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(201).json({
                status: 'ok',
                msg: 'Poster created',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Poster could not be created',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            msg: 'POST: POSTER - server error.',
        });
    }
});

posters.get('/home', async (_req, res) => {
    try {
        const selectQuery = `SELECT posters.id, posters.user_id, posters.img, posters.company, posters.profession, posters.title, cities.title as city, posters.salary FROM posters 
                            INNER JOIN cities ON cities.id = posters.city_id;`;
        const selectRes = await connection.execute(selectQuery);
        const posters = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: posters,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: POSTERS API - server error.',
        });
    }
});

posters.get('/users', async (req, res) => {
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT posters.id, posters.img, posters.company, posters.profession, posters.title, cities.title as city, posters.salary FROM posters 
                        INNER JOIN cities ON cities.id = posters.city_id;`;

    } else if (role === 'seller') {
        selectQuery = `SELECT posters.id, posters.user_id, posters.img, posters.company, posters.profession, posters.title, cities.title as city, posters.salary FROM posters 
                        INNER JOIN cities ON cities.id = posters.city_id WHERE user_id = ?;`;

    } else {
        return res.status(401).json({
            status: 'err',
            msg: 'Unauthorized.',
        });
    }

    try {
        const selectRes = await connection.execute(selectQuery, [req.user.id]);
        const posters = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: posters,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: POSTERS API - server error.',
        });
    }

});

posters.get('/:posterId', async (req, res) => {
    const { posterId } = req.params;
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT posters.img, posters.company, posters.profession, posters.title, cities.title as city, posters.salary FROM posters 
                        INNER JOIN cities ON cities.id = posters.city_id;`;

    } else if (role === 'seller') {
        selectQuery = `SELECT posters.id, posters.company, posters.user_id, posters.img, posters.profession, posters.title, cities.title as city, posters.salary FROM posters 
                        INNER JOIN cities ON cities.id = posters.city_id WHERE posters.id = ?;`;

    } else {
        return res.status(401).json({
            status: 'err',
            msg: 'Unauthorized.',
        });
    }

    try {
        const selectRes = await connection.execute(selectQuery, [posterId]);
        const posters = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            poster: posters[0],
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: POSTERS API - server error.',
        });
    }
});

// posters.delete('/:title', async (req, res) => {
//     const { title } = req.params;
//     try {
//         const deleteQuery = `DELETE FROM cities WHERE title = ?;`;
//         const deleteRes = await connection.execute(deleteQuery, [title]);
//         const cities = deleteRes[0];

//         if (cities.affectedRows > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'City deleted.',
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'City not found, nothing deleted.',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'DELETE: CITIES API - server error.',
//         });
//     }
// });

posters.put('/:posterId', async (req, res) => {
    const { posterId } = req.params;
    const { role, id } = req.user;
    const { img, company, profession, title, city, salary } = req.body;

    if (role !== 'seller') {
        return res.status(401).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    const selectQuery = `SELECT * FROM posters WHERE id = ?;`;
    const [selectedPosters] = await connection.execute(selectQuery, [posterId]);

    if (selectedPosters.length < 1) {
        return res.status(404).json({
            status: 'err',
            msg: 'Poster not found.',
        });
    }

    if (role === 'seler' && selectedPosters[0].user_id !== id) {
        return res.status(401).json({
            status: 'err',
            msg: 'Unauthorised. You are not the original poster.',
        });
    }

    try {
        const cityQuery = `SELECT id FROM cities WHERE title = ?;`;
        const [cityResArray] = await connection.execute(cityQuery, [city]);

        if (cityResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'City value is invalid.',
            });
        }

        const cityId = cityResArray[0].id;

        const updateQuery = `UPDATE posters SET img = ?, company = ?, profession = ?, title = ?, city_id = ?, salary = ? WHERE id = ?`;
        const updateResObject = await connection.execute(updateQuery, [img, company, profession, title, cityId, salary, posterId]);

        if (updateResObject[0].affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'Poster updated',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Poster could not be updated',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'PUT: POSTER API - server error.',
        });
    }
});

posters.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Posters" method' });
});
