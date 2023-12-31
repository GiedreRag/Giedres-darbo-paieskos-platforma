import express from 'express';
import { register } from './register.js';
import { login } from './login.js';
import { logout } from './logout.js';
import { cities } from './cities.js';
import { users } from './users.js';
import { posters } from './posters.js';
import { upload } from './upload.js';

export const api = express.Router();

api.all('/', (_req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

api.use('/register', register);
api.use('/login', login);
api.use('/logout', logout);
api.use('/cities', cities);
api.use('/users', users);
api.use('/posters', posters);
api.use('/upload', upload);
