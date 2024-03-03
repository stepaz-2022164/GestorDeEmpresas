'use strict'

import express from 'express'
import { createCompany, getAllCompanies, editCompany } from './company.controller.js'
import { validateToken } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/createCompany', validateToken, createCompany)
api.put('/editCompany/:id', validateToken, editCompany)

api.get('/getAllCompanies', validateToken ,getAllCompanies)

export default api