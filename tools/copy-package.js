const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json').toString());

packageJson['peerDependencies'] = packageJson['dependencies'];
delete packageJson['devDependencies'];
delete packageJson['scripts'];
delete packageJson['dependencies'];

fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
