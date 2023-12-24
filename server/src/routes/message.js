import express from 'express'
const router = express.Router()
import messageController from '../controllers/MessageController';

router.post("/",messageController.addMessage)
router.get("/:conversationId",messageController.getMessage)
router.get("/filterMessage/",messageController.getFilterMessage)
router.put("/:id",messageController.markMessage)


module.exports = router;
