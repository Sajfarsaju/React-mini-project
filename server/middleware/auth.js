import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    let token = req.header("Authorization");

    try {
        if (!token) return res.status(404).json({ message: "Authentication failed: no token provided." });

        if (token.startsWith("Bearer ")) {
            
            token = token.slice(7, token.length).trimLeft();
            
        }
        const verified = jwt.verify(token,'t9rXw5bF2mS7zQ8p');
        req.user = verified;

        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Authentication failed: invalid token." });
    }
};

export const generateAuthToken = (user) => {
    const jwtSecretKey = 't9rXw5bF2mS7zQ8p';
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, phone: user.phone }, jwtSecretKey);
    return token;
};

export const adminToken = (data) => {
    console.log(data, "token data");
    const jwtSecretKey ='t9rXw5bF2mS7zQ8p';
    const token = jwt.sign({ _id: data._id, email: data.email }, jwtSecretKey);
    return token;
};
