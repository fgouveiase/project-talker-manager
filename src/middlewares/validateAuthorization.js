const validateAuthorization = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    const tokenValidate = authorization.length === 16 && typeof authorization === 'string';
    if (!tokenValidate) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

module.exports = validateAuthorization;