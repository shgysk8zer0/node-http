import { warningHandler } from '@shgysk8zer0/js-utils/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { listDirByExt } from '@shgysk8zer0/npm-utils/fs';

export default {
	input: await listDirByExt('./', '.js')
		.then(files => files.filter(file => ! file.endsWith('.config.js'))),
	external: [
		'node:fs', 'node:fs/promises', 'node:crypto', 'node:path', 'node:child_process',
		'js-yaml', '@shgysk8zer0/consts/status.js', '@shgysk8zer0/consts/status-text.js',
		'@shgysk8zer0/consts/mimes.js',
	],
	onwarn: warningHandler,
	output: {
		dir: './cjs/',
		format: 'cjs',
		entryFileNames: '[name].cjs',
		chunkFileNames: '[name]-[hash].cjs',
	},
	plugins: [nodeResolve()],
};
