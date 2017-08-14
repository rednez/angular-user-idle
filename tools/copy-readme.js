const fs = require('fs');

let readme = fs.readFileSync('README.md').toString();
fs.writeFileSync('./dist/README.md', readme);

let changelog = fs.readFileSync('CHANGELOG.md').toString();
fs.writeFileSync('./dist/CHANGELOG.md', changelog);
