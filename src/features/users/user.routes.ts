import { Router } from 'express';
import { getUsers, login, register } from './user.controller';
const router = Router();
router.get('/get-users', getUsers);
router.post('/register', register);
router.post('/login', login);
export default router;
