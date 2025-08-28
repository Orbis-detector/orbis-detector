import { proccessFileAnalysis } from "./src/services/analysisService.js";

const testFile = './src/uploads/relato_elara.pdf';
const result = await proccessFileAnalysis(testFile);
console.log('Resultado:', result);