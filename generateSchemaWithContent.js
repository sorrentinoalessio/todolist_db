import fs from 'fs';
import path from 'path';

// Funzione ricorsiva per leggere cartelle e file
function readDirRecursive(dirPath) {
  const result = {};
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    if (item.name.startsWith('.git') || item.name === 'node_modules') continue; // ignora cartelle non necessarie
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      result[item.name] = readDirRecursive(fullPath);
    } else {
      // Legge il contenuto solo dei file testuali più comuni
      const ext = path.extname(item.name);
      if (['.js', '.json', '.env', '.ts', '.md'].includes(ext)) {
        try {
          result[item.name] = fs.readFileSync(fullPath, 'utf-8');
        } catch (err) {
          result[item.name] = null; // se non riesce a leggere
        }
      } else {
        result[item.name] = null; // file binari o altri tipi
      }
    }
  }

  return result;
}

// Root del progetto
const rootDir = path.resolve('./'); 

const schema = readDirRecursive(rootDir);

// Salva su file JSON
fs.writeFileSync('projectSchemaWithContent.json', JSON.stringify(schema, null, 2));
console.log('✅ Schema progetto con contenuti generato in projectSchemaWithContent.json');
