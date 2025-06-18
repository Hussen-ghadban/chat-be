import { Router } from 'express';
import { getMessages } from './message.controller';
import { sendMessage } from './message.controller';

const router = Router();
router.post('/send-message', sendMessage);
router.get('/read-messages', getMessages);

export default router;
