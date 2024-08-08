import express from "express";
import userController from "../controller/user-controller.js";
import{ authMiddleware } from "../middleware/auth-middleware.js";
import contactCountroller from "../controller/contact-countroller.js";
import addressController from "../controller/address-controller.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', userController.get)
userRouter.patch('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout)

// Contact API
userRouter.post('/api/contacts',contactCountroller.create )
userRouter.get('/api/contacts/:contactId',contactCountroller.get )
userRouter.put('/api/contacts/:contactId',contactCountroller.update )
userRouter.delete('/api/contacts/:contactId',contactCountroller.remove )
userRouter.get('/api/contacts/',contactCountroller.search )

// Address API
userRouter.post('/api/contacts/:contactId/addresses',addressController.create )


export{
    userRouter
}