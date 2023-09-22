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
