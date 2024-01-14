import jwt from 'jsonwebtoken'

export const validateAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });


    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) res.status(401).json({ message: "Token not found" });

        req.user = user;
        next();
    })


}