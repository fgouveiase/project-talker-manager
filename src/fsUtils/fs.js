const fs = require('fs').promises;
const path = require('path');

const TALKER_PATH = '../talker.json';

async function readTalker() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, TALKER_PATH));
        const jsonParse = JSON.parse(data);
        return jsonParse;
    } catch (error) {
    console.log(`Erro na leitura: ${error}`);
    }
}

async function writeTalker(talker) {
    try {
      const addTalkers = JSON.stringify(talker);
      await fs.writeFile(path.join(__dirname, TALKER_PATH), addTalkers);
    } catch (error) {
      throw new Error(`Erro ao inserir palestrante arquivo: ${error}`);
    }
  }

module.exports = {
    readTalker,
    writeTalker,
};
