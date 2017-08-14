import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const NAME = 'user-idle';
const DIST = 'dist/';

export default {
  entry: DIST + NAME + '.js',
  dest: DIST + NAME + '.umd.js',
  format: 'umd',
  moduleName: NAME,
  sourceMap: false,
  globals: {
    '@angular/core': '_angular_core',
    'rxjs': 'rxjs'
  },
  external: [
    '@angular/core',
    'rxjs'
  ],
  plugins: [
    resolve({module: true, main: true}),
    commonjs({include: 'node_modules/**'})
  ],
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  }
};
