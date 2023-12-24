import express from 'express'
const router = express.Router()
import commentController from '../controllers/CommentController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, commentController.create)
router.put('/updateComment', middlewareAuth.verifyToken, commentController.updateComment)
router.get('/getAllComments', commentController.getAllComments)
router.get('/getAllCommentsByPost', commentController.getAllCommentsByPost)
router.delete('/deleteComment?:id', middlewareAuth.verifyToken, commentController.deleteComment)

module.exports = router;
