import express from "express"
import { getUser, getUserById, createUser } from "../controllers/users-controller"

const router = express.Router()

router.get('/user', getUser)
router.get('/user/:id', getUserById)
router.post('/user', createUser)

export { router as userRouter };