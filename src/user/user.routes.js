'use strict'

import express from 'express'
import { register, login, update, updatePassword} from './user.controller.js'
import { validateToken } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)
api.put('/updateUser/:id', validateToken, update)
api.put('/updatePassword/:id', validateToken, updatePassword)

export default api