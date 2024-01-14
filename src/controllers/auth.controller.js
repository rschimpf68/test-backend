import bcrypt from 'bcryptjs'
import { serialize } from "cookie";

import { createAccessToken } from '../libs/jwt.js'
import { PrismaClient } from '@prisma/client'

// import { useRouter } from 'next/router'
const jtwName = 'token';

const prisma = new PrismaClient()



export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const userExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (userExists) return res.status(400).json(["The email is already used"])
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        const token = await createAccessToken({
            id: newUser.id,
            email: newUser.email,
            createdAt: newUser.createdAt

        })

        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        })
        res.cookie('id', newUser.userId, {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        })

        res.send({
            id: newUser.userId,
            username: newUser.username,
        })

    } catch (error) {
        res.status(500).json({ "Message: ": error.message })
    }

}
export const login = async (req, res) => {
    const { email, password } = req.body

    console.log(email, password);

    try {

        const userExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (!userExists) return res.status(400).json("[!] User not found...");

        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) return res.status(400).json("[!] Incorrect password...");

        const token = await createAccessToken({
            id: userExists.userId,
            username: userExists.username,

        });


        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        res.cookie('id', userExists.userId, {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });


        res.send({
            id: userExists.userId,
            username: userExists.username,
            email: userExists.email,
            createdAt: userExists.createdAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const logout = async (req, res) => {
    const { token } = req.cookies

    if (!token) res.status(401).json("no token");

    res.cookie(jtwName, "", {
        expires: new Date(0),
    });
    res.cookie('id', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};