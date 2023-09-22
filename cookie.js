/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 */
export class Cookie {
	#name;
	#value;
	#domain;
	#path;
	#expires;
	#maxAge;
	#sameSite;
	#httpOnly;
	#secure;
	#partitioned;

	constructor(name, value, {
		domain,
		path = '/',
		expires,
		maxAge,
		sameSite = 'Lax',
		httpOnly = false,
		secure = false,
		partitioned = false,
	} = {}) {
		this.name = name;
		this.value = value;
		this.path = path;
		this.sameSite = sameSite;
		this.httpOnly = httpOnly;
		this.secure = secure;
		this.partitioned = partitioned;

		if (typeof domain !== 'undefined') {
			this.domain = domain;
		}

		if (typeof expires !== 'undefined') {
			this.expires = expires;
		}

		if (typeof maxAge !== 'undefined') {
			this.maxAge = maxAge;
		}
	}

	get name() {
		return this.#name;
	}

	set name(val) {
		if (typeof val !== 'string' || val.legnth === 0) {
			throw new TypeError('Cookie name must be a non-empty string.');
		} else {
			this.#name = val;
		}
	}

	set value(val) {
		if (typeof val === 'undefined' || val === null) {
			this.#value = '';
		} else {
			this.#value = val.toString();
		}
	}

	get maxAge() {
		return this.#maxAge;
	}

	set maxAge(val) {
		if (typeof val !== 'number' || ! Number.isSafeInteger(val)) {
			throw new TypeError('Max-Age must be an integer.');
		} else {
			this.#maxAge = val;
		}
	}

	get path() {
		return this.#path;
	}

	set path(val) {
		if (val instanceof URL) {
			this.#path = val.pathname;
		} else if (typeof val === 'string') {
			if (new URL(val, 'https://example.com').pathname !== val) {
				throw new Error(`Invalid path: ${val}`);
			} else {
				console.log(`Set #path to ${val}`);
				this.#path = val;
			}
		} else {
			throw new TypeError('Path must be a string or URL.');
		}
	}

	get domain() {
		return this.#domain;
	}

	set domain(val) {
		if (val instanceof URL) {
			this.#domain = val.hostname;
		} else if (typeof val === 'string') {
			if (new URL(`https://${val}`).hostname === val) {
				this.#domain = val;
			} else {
				throw new Error(`Invalid domain: ${val}`);
			}
		} else {
			throw new TypeError('Domain must be a URL or string.');
		}
	}

	get expires() {
		return this.#expires;
	}

	set expires(val) {
		if (val instanceof Date) {
			this.#expires = val;
		} else if (typeof val === 'string' || typeof val ===  'number') {
			this.expires = new Date(val);
		}
	}

	get httpOnly() {
		return this.#httpOnly;
	}

	set httpOnly(val) {
		if (typeof val !== 'boolean') {
			throw new TypeError('HttpOnly must be a boolean.');
		} else {
			this.#httpOnly = val;
		}
	}

	get secure() {
		return this.#secure;
	}

	set secure(val) {
		if (typeof val !== 'boolean') {
			throw new TypeError('Secure must be a boolean.');
		} else {
			this.#secure = val;
		}
	}

	get partitioned() {
		return this.#partitioned;
	}

	set partitioned(val) {
		if (typeof val !== 'boolean') {
			throw new TypeError('Partitioned must be a boolean.');
		} else {
			this.#partitioned = val;
		}
	}

	get sameSite() {
		return this.#sameSite;
	}

	set sameSite(val) {
		if (! ['Strict', 'Lax', 'None'].includes(val)) {
			throw new TypeError('SameSite must be a "Strict", "Lax", or "None".');
		} else {
			this.#sameSite = val;
		}
	}

	toString() {
		let cookie = `${encodeURIComponent(this.#name)}=${encodeURIComponent(this.#value)}`;

		const flags = {
			Domain: this.#domain,
			Path: this.#path,
			Expires: this.#expires,
			'Max-Age': this.#maxAge,
			SameSite: this.#sameSite,
			HttpOnly: this.#httpOnly,
			Secure: this.#secure,
			Partitioned: this.#partitioned,
		};

		return (cookie + '; ' + Object.entries(flags).reduce((flags, [key, val]) => {
			if (typeof val === 'string') {
				flags.push(key === 'Path' ? `${key}=${val}` : `${key}=${encodeURIComponent(val)}`);
			} else if (typeof val === 'number' && ! Number.isNaN(val)) {
				flags.push(`${key}=${val}`);
			} else if (typeof val === 'boolean') {
				if (val) {
					flags.push(key);
				}
			} else if (val instanceof Date) {
				flags.push(`${key}=${val.toGMTString()}`);
			}

			return flags;
		}, []).join('; ')).trim();
	}
}
