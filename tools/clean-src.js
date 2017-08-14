const del = require('del');

del(['src/*.ngfactory.ts', 'src/*.ngsummary.json'])
  .then(paths => {
    console.log('Deleted:\n', paths.join('\n'));
  });
