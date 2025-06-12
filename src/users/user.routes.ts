import { Router } from 'express';
import { addUser, getUsers } from './user.controller';
const router = Router();
router.post('/add-user', addUser);
router.get('/get-users', getUsers);

export default router;
