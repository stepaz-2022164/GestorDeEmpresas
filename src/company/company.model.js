'use strict'

import {Schema, model} from 'mongoose'

const companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    impact: {
        type: String,
        enum: ['LOW','MEDIUM','HIGH'],
        uppercase: true,
        required: true
    },
    years_trayectory: {
        type: Number,
        required: true
    }
})

export default model('company', companySchema)