const copy = require('copy');

copy('./src/*.ts', './dist', (err, files) => {
  if (err) throw err;
  console.log('Copy of sources ts is success');
});
