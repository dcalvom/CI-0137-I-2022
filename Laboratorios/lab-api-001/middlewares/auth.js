const jwt = require("jsonwebtoken");
const db = require("../models/index");

exports.checkUserIsAuthenticated = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        if (!token) {
            res.status(401).json({
                error: true,
                message: "El usuario no está autenticado",
            });
        }
        else {
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                const user = db.User.findByPk(decodedToken.userId);
                if (!user) {
                    res.status(401).json({
                        error: true,
                        message: "El usuario no está autenticado",
                    });
                }
                req.userRoles = decodedToken.roles;
                next();
            } catch (error) {
                res.status(400).json({
                    error: true,
                    message: "La información enviada no es válida. Verifique que su sesión no haya expirado.",
                });
            }
        }
    }
    else {
        res.status(401).json({
            error: true,
            message: "El usuario no está autenticado",
        });
    }  
};

exports.checkRoles = (requiredRoles) => {
    return async (req, res, next) => {
        const userRoles = req.userRoles;
        const role = userRoles.find((r) => {
            return requiredRoles.find((rr) => rr === r) !== undefined;
        });
        if(role === undefined) {
            return res.status(401).json({
                error: true,
                message: "El usuario no tiene los permisos necesarios para acceder a este recurso",
            });
        }
        next();
    };
}
