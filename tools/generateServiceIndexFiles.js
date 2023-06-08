/* eslint-disable no-console */
import dir from 'node-dir';
import fs from 'fs';
import path from 'path';

dir.subdirs(path.resolve(__dirname, '../app/features'), (err1, directoryPaths) => {
  if (err1) throw err1;

  directoryPaths.sort();
  for (const directoryPath of directoryPaths) {
    if (!/features(?:\/|\\).+?(?:\/|\\)services$/.test(directoryPath)) continue;

    fs.readdir(directoryPath, (err2, files) => {
      if (err2) throw err2;

      files.sort();
      let indexContents = '';
      for (const file of files) {
        if (!/^.+\.js$/.test(file) || /^index\.js$/.test(file) || /^.+\.test\.js$/.test(file)) continue;

        const fileName = path.basename(file, '.js');
        indexContents += `export {default as ${fileName}} from './${fileName}';\n`;
      }

      const indexFilePath = path.join(directoryPath, 'index.js');

      fs.writeFile(indexFilePath, indexContents, err3 => {
        if (err3) throw err3;
      });
    });
  }
});
