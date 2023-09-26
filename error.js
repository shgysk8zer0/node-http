import { INTERNAL_SERVER_ERROR } from '@shgysk8zer0/consts/status.js';

export class HTTPError extends Error {
	#status = INTERNAL_SERVER_ERROR;
	#response;

	constructor(message, { status = INTERNAL_SERVER_ERROR, cause, resp } = {}) {
		super(message, { cause });

		if (resp instanceof Response) {
			this.#response = resp;
			this.#status = resp.status;
		} else if (typeof status === 'number' && Number.isSafeInteger(status) && status > -1 && status < 600) {
			this.#status = status;
		} else {
			this.#status = INTERNAL_SERVER_ERROR;
		}
	}

	get body() {
		return this.#response?.body;
	}

	get bodyUsed() {
		return this.#response?.bodyUsed;
	}

	get headers() {
		return this.#response?.headers;
	}

	get ok() {
		return this.#response?.ok;
	}

	get redirected() {
		return this.#response?.redirected;
	}

	get status() {
		return this.#status;
	}

	get type() {
		return this.#response?.type;
	}

	get url() {
		return this.#response?.url;
	}

	async arrayBuffer() {
		return this.#response?.arrayBuffer();
	}

	async blob() {
		return this.#response?.blob();
	}

	async text() {
		return this.#response?.text();
	}

	async json() {
		return this.#response?.json();
	}

	async formData() {
		return this.#response?.formData();
	}

	toString() {
		return JSON.stringify(this);
	}

	toJSON() {
		return {
			error: {
				status: this.#status,
				message: this.message,
			}
		};
	}

	static async fromResponse(resp, { cause } = {}) {
		if (! (resp instanceof Response)) {
			throw new TypeError('resp must be a Response object.');
		} else {
			const { error } = await resp.clone().json();

			if (typeof error !== 'object' || ! error.hasOwnProperty('message') || ! error.hasOwnProperty('status')) {
				return  new this(`<${resp.url}> [${resp.status} ${resp.statusText}]`, { resp, cause });
			} else {
				return new this(error.message, { resp, cause });
			}
		}
	}
}
