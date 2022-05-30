
exports.userIsAuthenticated = (req, res, next) => {
    console.log(req.headers.authorization);
    const userIsLoggedIn = true;
    if (!userIsLoggedIn) {
        res.status(401).json({
            error: true,
            message: "El no usuario no está autenticado."
        })
    }
    else {
        next();
    }
}

exports.userIsInRole = (authorizedRoles) => {
    return (req, res, next) => {
        const userRoles = ["Admin"];
        const userValidRole = userRoles.find((ur) => {
            return authorizedRoles.find((ar) => ar === ur) !== undefined;
        });
        if (!userValidRole) {
            res.status(401).json({
                error: true,
                message: "El no usuario no tiene los accesos necesarios para esta operación."
            })
        }
        else {
            next();
        }
    }
}
