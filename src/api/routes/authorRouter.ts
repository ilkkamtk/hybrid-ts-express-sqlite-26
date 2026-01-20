import express from 'express';
import {authorGet, authorsGet} from '../controllers/authorController';

const router = express.Router();

router.route('/').get(authorsGet);

router.route('/:id').get(authorGet);

export default router;
