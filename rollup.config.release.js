import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';
import sucrase from '@rollup/plugin-sucrase';
import copy from 'rollup-plugin-copy'
//import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    dir: 'release',
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
    commonjs(),
    copy({
      targets: [
        { src: 'package.json', dest: 'release' }
      ]
    })
		//babel({
		//	exclude: 'node_modules/**'
		//})
	]
};
