import * as EXTS from '@shgysk8zer0/consts/exts.js';
import * as MIMES from '@shgysk8zer0/consts/mimes.js';
import * as STATUS from '@shgysk8zer0/consts/status.js';
import * as STATUS_TEXT from '@shgysk8zer0/consts/status-text.js';
import { extname } from 'node:path';

export async function openLink(url, base) {
	if (typeof url === 'string') {
		return openLink(new URL(url, base));
	} else if (! (url instanceof URL)) {
		throw new TypeError('url must be a string or URL object.');
	} else if (typeof window !== 'undefined') { // browser
		window.open(url);
	} else if (typeof process !== 'undefined') { // node
		const { exec } = await import('node:child_process');

		await new Promise((resolve, reject) => {
			switch (process.platform) {
				case 'linux':
				case 'freebsd':
				case 'openbsd':
				case 'netbsd':
					exec(`xdg-open "${url.href}"`, err => err instanceof Error ? reject(err) : resolve());
					break;

				case 'darwin':
					exec(`open "${url.href}"`, err => err instanceof Error ? reject(err) : resolve());
					break;

				case 'win32':
					exec(`start "" "${url.href}"`, err => err instanceof Error ? reject(err) : resolve());
					break;

				default:
					throw new Error(`Unknown platform: ${process.platform}.`);
			}
		});
	}
}

export function getStatusText(code) {
	const [key] = Object.entries(STATUS).find(([,stat]) => stat === code) ?? [];

	return STATUS_TEXT[key] ?? '';
}

export function getMimeType(path) {
	const ext = extname(path).toLowerCase();
	console.log({ path, ext });

	if (ext.length !== 0) {
		const [key] = Object.entries(EXTS).find(([,exts]) => exts.includes(ext)) ?? [];

		return MIMES[key] ?? '';
	} else {
		return '';
	}
}
