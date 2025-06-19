import { Router } from 'express';
import { getMessages, getUserChats } from './message.controller';
import { sendMessage } from './message.controller';

const router = Router();
router.post('/send-message', sendMessage);
router.get('/read-messages', getMessages);
router.get('/user-chats', getUserChats);

export default router;
