import path from 'path';
import express from 'express';
import multer from 'multer';

export const upload = express.Router();

const ensureUser = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin' || role !== 'seller') {
        return res.status(401).json({
            status: 'err',
            msg: 'Unauthorized.',
        });
    }

    next();
};

upload.use(ensureUser);

const posterStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/images/poster');
    },
    filename: (_req, file, cb) => {
        cb(null, 'poster_' + Date.now() + path.extname(file.originalname));
    },
});
const posterUpload = multer({
    storage: posterStorage,
    limits: {
        fileSize: 1e7,
    },
});

upload.use('/poster', posterUpload.single('poster_img'), (req, res) => {
    return res.status(201).json({
        status: 'ok',
        msg: 'Upload complete.',
        path: 'images/poster/' + req.file.filename,
    });
});

upload.use('/', (_req, res) => {
    return res.status(400).json({
        status: 'err',
        msg: 'Upsupported "Upload" route.',
        options: [
            'http://localhost:3001/api/upload/poster',
        ],
    });
});

upload.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Upload" method' });
});
