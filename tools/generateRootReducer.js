/* eslint-disable no-console */
import dir from 'node-dir';
import fs from 'fs';
import path from 'path';

dir.subdirs(path.resolve(__dirname, '../app/features'), (err1, directoryPaths) => {
  if (err1) throw err1;

  const features = [];

  directoryPaths.sort();
  for (const directoryPath of directoryPaths) {
    const matches = directoryPath.match(/features(?:\/|\\)(.+?)(?:\/|\\)reducers$/);
    if (!matches) continue;

    features.push(matches[1]);
  }

  features.sort();

  let rootReducerContents =
    '/* eslint-disable sort-imports */\n' +
    'import {combineReducers} from \'redux\';\n' +
    'import {routerReducer} from \'react-router-redux\';\n';

  for (const feature of features) {
    const name = feature.replace('\\', '');
    const path = feature.replace('\\', '/');
    rootReducerContents += `import ${name} from './features/${path}/reducers';\n`;
  }

  rootReducerContents +=
    '\nconst rootReducer = combineReducers({\n' +
    '  features: combineReducers({\n';

  for (const feature of features) {
    const name = feature.replace('\\', '');
    rootReducerContents += `    ${name},\n`;
  }

  rootReducerContents +=
    '  }),\n' +
    '  routing: routerReducer,\n' +
    '});\n\n' +
    'export default rootReducer;\n';

  fs.writeFile(path.resolve(__dirname, '../app/rootReducer.js'), rootReducerContents, err2 => {
    if (err2) throw err2;
  });
});
