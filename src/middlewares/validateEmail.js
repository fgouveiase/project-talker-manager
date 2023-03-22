const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(regex)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

module.exports = validateEmail;