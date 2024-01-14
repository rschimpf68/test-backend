import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import jwt from 'jsonwebtoken'

export const profile = async (req, res) => {

    const { token } = req.cookies

    try {

        const user = jwt.verify(token, process.env.TOKEN_SECRET);

        return res.json({
            user: user.email,
            email: user.email,

        });


    } catch (error) {
        return res.status(401).json({ error: "invalid token" });
    }


    // const userExists = await prisma.user.findFirst({
    //     where: {
    //         userId: req.user.userId
    //     }
    // });

    // if (!userExists) return res.json(400).json({ message: "User don't exists..." });

    // return res.json({
    //     id: userExists.userId,
    //     email: userExists.email,
    //     createdAt: userExists.createdAt,
    //     updatedAt: userExists.updatedAt
    // })


}
