import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const encodedToken = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);
        return decodedToken;
    } catch (error) {
        throw new error(error.message);
    }
}