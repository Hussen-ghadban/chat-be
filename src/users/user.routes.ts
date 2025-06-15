import { Router } from 'express';
import { getUsers, login } from './user.controller';
const router = Router();
router.get('/get-users', getUsers);
// router.post('/signup', signup);
router.post('/login', login);
export default router;
