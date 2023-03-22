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

module.exports = {
    readTalker,
   // findTalkerId,
};
