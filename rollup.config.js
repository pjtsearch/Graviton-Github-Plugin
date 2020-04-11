import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';
import sucrase from '@rollup/plugin-sucrase';
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
  //   typescript({
  //     "lib": ["esnext", "dom"],
  //     "strict": true,
  //     "downlevelIteration":true
  // }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript']
    }),
    commonjs()
		//babel({
		//	exclude: 'node_modules/**'
		//})
	]
};