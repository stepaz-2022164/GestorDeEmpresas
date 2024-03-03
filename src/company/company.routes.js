'use strict'

import express from 'express'
import { createCompany, getAllCompanies, editCompany, getCompaniesByAtoZ, getCompaniesByZtoA, getCompaniesByCategory, getCompaniesByYears, getCompaniesByImpact ,generateReport } from './company.controller.js'
import { validateToken } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/createCompany', validateToken, createCompany)
api.put('/editCompany/:id', validateToken, editCompany)

//Gets
api.get('/getAllCompanies', validateToken ,getAllCompanies)
api.get('/getCompaniesByAtoZ', validateToken ,getCompaniesByAtoZ)
api.get('/getCompaniesByZtoA', validateToken ,getCompaniesByZtoA)
api.post('/getCompaniesByCategory', validateToken, getCompaniesByCategory)
api.post('/getCompaniesByYears', validateToken, getCompaniesByYears)
api.post('/getCompaniesByImpact', validateToken, getCompaniesByImpact)

//Report
api.get('/generateReport', validateToken, generateReport)

export default api