import express from 'express'
const router = express.Router()
import postController from '../controllers/PostController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'

router.post('/createPost', middlewareAuth.verifyToken, uploadCloud.single("image"), postController.createPost)
router.post('/uploadImage', uploadCloud.single("image"), postController.uploadImage)
router.get('/getAll', postController.getAll)
router.get('/search?:key', postController.search)
router.get('/getAllPostByCustomer?:id', postController.getAllPostByCustomer)
router.get('/getAllPostByCategory?:id', postController.getAllPostByCategory)
router.get('/detail?:slug', postController.detailBySlug)
router.put('/like?:id', middlewareAuth.verifyToken, postController.like)
router.put('/updatePost?:id', middlewareAuth.verifyToken, uploadCloud.single("image"), postController.updatePost)
router.put('/updateView?:slug', postController.updateView)
router.delete('/deletePost', middlewareAuth.verifyToken, postController.deletePost)

module.exports = router;
