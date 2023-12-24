import express from 'express'
const router = express.Router()
import conversationController from '../controllers/ConversationController';

router.post("/",conversationController.createConversation)
router.get("/:userId",conversationController.getConversation)


module.exports = router;
