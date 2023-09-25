import { warningHandler } from '@shgysk8zer0/js-utils/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { listDirByExt } from '@shgysk8zer0/npm-utils/fs';

export default {
	input: await listDirByExt('./', '.js').then(files => files.filter(file => ! file.endsWith('.config.js'))),
	external: ['node:fs', 'node:fs/promises', 'node:crypto', 'node:path', 'node:child_process', 'js-yaml'],
	onwarn: warningHandler,
	output: {
		dir: './cjs/',
		format: 'cjs',
		entryFileNames: '[name].cjs',
		chunkFileNames: '[name]-[hash].cjs',
	},
	plugins: [nodeResolve()],
};
/*import { getConfig } from '@shgysk8zer0/js-utils/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default getConfig('./http.js', {
	format: 'cjs',
	minify: false,
	sourcemap: false,
	external: ['node:child_process'],
	plugins: [nodeResolve()],
	globals: {},
});*/
