import express from 'express';
import { connection } from '../dbSetup.js';

export const posters = express.Router();

// posters.post('/', async (req, res) => {
//     const { title } = req.body;

//     if (!title) {
//         return res.status(400).json({
//             status: 'err',
//             msg: 'City could not be created. "Title" value was empty.',
//         });
//     }

//     try {
//         const selectQuery = `SELECT * FROM cities WHERE title = ?;`;
//         const selectRes = await connection.execute(selectQuery, [title]);
//         const cities = selectRes[0];

//         if (cities.length > 0) {
//             return res.status(200).json({
//                 status: 'err-list',
//                 errors: [
//                     {
//                         input: 'city',
//                         msg: 'Such city already exists.',
//                     }
//                 ]
//             });
//         }

//         const insertQuery = `INSERT INTO cities (title) VALUES (?)`;
//         const insertRes = await connection.execute(insertQuery, [title]);
//         const insertResObject = insertRes[0];

//         if (insertResObject.insertId > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'City created.',
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'City could not be created.',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'POST: CITIES API - server error.',
//         });
//     }
// });

posters.get('/', async (req, res) => {
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT * FROM posters;`;

    } else if (role === 'seller') {
        selectQuery = `SELECT * FROM posters WHERE user_id = ?;`;

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

// posters.put('/:oldTitle', async (req, res) => {
//     const { oldTitle } = req.params;
//     const { newTitle } = req.body;

//     if (!oldTitle || !newTitle) {
//         return res.status(400).json({
//             status: 'err',
//             msg: 'City could not be updated. "Title" values were empty.',
//         });
//     }

//     try {
//         const selectQuery = `SELECT * FROM cities WHERE title = ?;`;
//         const selectRes = await connection.execute(selectQuery, [newTitle]);
//         const cities = selectRes[0];

//         if (cities.length > 0) {
//             return res.status(200).json({
//                 status: 'err-list',
//                 errors: [
//                     {
//                         input: 'city',
//                         msg: 'Such city already exists.',
//                     }
//                 ]
//             });
//         }

//         const updateQuery = `UPDATE cities SET title = ? WHERE title = ?`;
//         const updateRes = await connection.execute(updateQuery, [newTitle, oldTitle]);
//         const updateResObject = updateRes[0];

//         if (updateResObject.affectedRows > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'City updated',
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'City could not be updated',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'PUT: CITIES API - server error.',
//         });
//     }
// });

posters.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Posters" method' });
});
