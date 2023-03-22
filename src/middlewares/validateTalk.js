const validateTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }

    const { talk: { watchedAt } } = req.body;
    
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    const regex = /^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt);
    if (!regex) {
     return res.status(400).json({ 
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

module.exports = validateTalk;