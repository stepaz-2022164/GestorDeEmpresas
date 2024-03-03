'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { createToken } from '../utils/jwt.js'

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let existingUser = await User.findOne({ username: data.username })
        if (existingUser) return res.status(400).send({ message: 'User already exists' })
        let user = new User(data)
        await user.save()
        return res.send({ message: 'User created succesfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error creating user' })
    }
}

export const login = async (req, res) => {
    try {
        let { username, email, password } = req.body
        let user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                surname: user.surname,
            }
            let token = await createToken(loggedUser)
            return res.send({
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error logging in' })
    }
}