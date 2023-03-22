const express = require('express');
const crypto = require('crypto');
const { readTalker, writeTalker } = require('./fsUtils/fs');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateAge = require('./middlewares/validateAge');
const validateName = require('./middlewares/validateName');
const validateTalk = require('./middlewares/validateTalk');
const validateAuthorization = require('./middlewares/validateAuthorization');
const validateRate = require('./middlewares/validateRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talker = await readTalker();
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readTalker();
  const findById = talker.find((t) => t.id === Number(id));
  if (!findById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(HTTP_OK_STATUS).json(findById);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker',
  validateAuthorization, 
  validateAge, 
  validateName, 
  validateTalk, 
  validateRate, 
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readTalker();
  const addTalker = {
    name,
    age,
    id: talkers.length + 1,
    talk,
  };
  talkers.push(addTalker);
  writeTalker(talkers);
  return res.status(201).json(addTalker);
});

app.put('/talker/:id',
  validateAuthorization, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateRate, 
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkersData = await readTalker();
  const filterPerson = talkersData.find((person) => person.id === Number(id));

  if (!filterPerson) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  filterPerson.name = name;
  filterPerson.age = age;
  filterPerson.talk = talk;

  await writeTalker(talkersData);
  return res.status(200).json(filterPerson);
});

app.delete('/talker/:id', validateAuthorization, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();
  const findTalker = talkers.find((t) => t.id === Number(id));
  if (findTalker) {
    const talkerIndex = talkers.indexOf(findTalker);
    talkers.splice(talkerIndex, 1);
    await writeTalker(talkers);
    return res.status(204).json();
  }
});
