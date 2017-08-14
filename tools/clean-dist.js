const del = require('del');

del(['dist/!(*.umd.js|*.esm.js|*.d.ts|*.umd.js.map|*.esm.js.map|package.json|*.metadata.json)'])
  .then(paths => {
    console.log('Deleted:\n', paths.join('\n'));
  });
