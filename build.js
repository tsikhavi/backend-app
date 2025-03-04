const fs = require('fs');
const path = require('path');

const buildFolder = path.join(__dirname, 'dist');

// Создаём папку dist, если её нет
if (!fs.existsSync(buildFolder)) {
  fs.mkdirSync(buildFolder);
}

// Копируем файлы
const filesToCopy = ['package.json', '.env', 'migrate.js', 'app.js'];
filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(buildFolder, file);
  fs.copyFileSync(src, dest);
});

// Копируем папки
const foldersToCopy = ['bin', 'routes', 'models', 'services', 'config'];
foldersToCopy.forEach(folder => {
  const src = path.join(__dirname, folder);
  const dest = path.join(buildFolder, folder);
  fs.cpSync(src, dest, { recursive: true });
});

console.log('✅ Build complete. All necessary files copied to dist/');
