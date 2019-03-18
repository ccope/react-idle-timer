import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-minify-es'
import progress from 'rollup-plugin-progress'

const FILE = 'dist/index'
const NAME = 'IdleTimer'

export default {
  input: 'src/index.js',
  output: [{
    name: NAME,
    file: `${FILE}.min.js`,
    sourcemap: true,
    format: 'cjs'
  }, {
    name: NAME,
    file: `${FILE}.es.js`,
    sourcemap: true,
    format: 'es'
  }],
  external: [
    'react',
    'react-dom',
    'prop-types'
  ],
  plugins: [
    babel({
      exclude: [ 'node_modules/**' ],
      plugins: [ 'external-helpers' ]
    }),
    resolve({
      main: true,
      module: true,
      preferBuiltins: true,
      browser: true
    }),
    commonjs({
      namedExports: {
        'node_modules/performance-now/lib/performance-now.js': ['now']
      }
    }),
    builtins(),
    globals(),
    minify(),
    progress()
  ]
}
