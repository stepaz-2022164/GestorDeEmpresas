'use strict'

import Company from './company.model.js'

export const createCompany = async (req, res) => {
    try {
        let data = req.body
        let existingCompany = await Company.findOne({name: data.name})
        if (existingCompany) return res.status(400).send({message: 'Company already exists'})
        let company = new Company(data)
        await company.save()
        return res.send({message: 'Company created successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error creating company'})
    }
}

export const getAllCompanies = async (req, res) => {
    try {
        let companies = await Company.find()
        return res.send(companies)
    } catch (error) {
        console.error(error)
    }
}

export const editCompany = async (req, res) => {
    try {
        let data = req.body
        let companyId = req.params.id
        let updatedCompany = await Company.findOneAndUpdate(
            {_id: companyId},
            data,
            {new: true}
        )
        if (!updatedCompany) return res.status(404).send({message: 'Company not found and not updated'})
        return res.send({message: 'Company updated succesfully', updatedCompany})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error updating company'})
    }
}