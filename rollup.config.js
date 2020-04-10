import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
//import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
		resolve({
            preferBuiltins: true
        }),
        commonjs()
		//babel({
		//	exclude: 'node_modules/**'
		//})
	]
};