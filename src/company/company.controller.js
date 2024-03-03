'use strict'

import Company from './company.model.js'
import XlsxPopulate from 'xlsx-populate'

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
        let companies = await Company.find().populate('category', ['name'])
        return res.send(companies)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting companies'})
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

export const getCompaniesByAtoZ = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: 1})
        return res.send({message: 'Companies by A-Z', companies}).populate('category', ['name'])
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting companies'})
    }
}

export const getCompaniesByZtoA = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: -1}).populate('category', ['name'])
        return res.send({message: 'Companies by Z-A', companies})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting companies'})
    }
}

export const getCompaniesByCategory = async (req, res) => {
    try {
        let {category} = req.body
        let companies = await Company.find({category: category}).populate('category', ['name'])
        if (companies.length == 0) return res.status(404).send({message: 'Companies not found'})
        return res.send({message: 'Companies by category', companies})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting companies'})
    }
}

export const getCompaniesByYears = async (req, res) => {
    try {
        let {years} = req.body
        let companies = await Company.find({years_trayectory: years}).populate('category', ['name'])
        if (companies.length == 0) return res.status(404).send({message: 'Companies not found'})
        return res.send({message: `Companies by ${years} years`, companies})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting companies'})
    }
}

export const getCompaniesByImpact = async (req, res) => {
    try {
        let {impact} = req.body
        let companies = await Company.find({impact: impact}).populate('category', ['name'])
        if (companies.length == 0) return res.status(404).send({message: 'Companies not found'})
        return res.send({message: `Companies by impact ${impact}`, companies})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting companies'})
    }
}

export const generateReport = async (req, res) => {
    try {
        let report = await XlsxPopulate.fromBlankAsync()
        let companies = await Company.find().populate({
            path: 'category',
            select: 'name'
        })
        let data = companies.map(company => [
            company.name,
            company.email,                                                           
            company.phone,
            company.address,
            company.category.name,
            company.impact,
            company.years_trayectory
        ])
        report.sheet(0).cell('A1').value([
            ['Name', 'Email', 'Phone', 'Address', 'Category', 'Impact', 'Yaears trayectory']
        ])
        report.sheet(0).cell('A2').value(data)
        report.toFileAsync('./src/reports/report.xlsx')
        return res.send({message: 'Report generated successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error generating report'})
    }
}