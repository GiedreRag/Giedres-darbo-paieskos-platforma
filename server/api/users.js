import express from 'express';
import { connection } from '../dbSetup.js';

export const users = express.Router();

users.get('/', async (_req, res) => {
    try {
        const selectQuery = `SELECT users.fullname, users.email, users.is_Blocked, users.createdAt, roles.role FROM users
                            INNER JOIN roles ON roles.id = users.role_id;`;
        const selectRes = await connection.execute(selectQuery);
        const users = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: users,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: users API - server error.',
        });
    }
});

users.put('/:email', async (req, res) => {
    const { email } = req.params;
    const { newStatus } = req.body;

    if (!email || newStatus === undefined) {
        return res.status(400).json({
            status: 'err',
            msg: 'User could not be updated. "Email" and  "newStatus" were empty.',
        });
    }

    try {
        const updateQuery = `UPDATE users SET is_Blocked = ? WHERE email = ?`;
        const updateRes = await connection.execute(updateQuery, [newStatus, email]);
        const updateResObject = updateRes[0];

        if (updateResObject.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'User status updated',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'User status could not be updated',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'PUT: USERS API - server error.',
        });
    }
});

users.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "users" method' });
});
