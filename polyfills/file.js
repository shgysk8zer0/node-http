if (! (globalThis.File instanceof Function)) {
	globalThis.File = class File extends Blob {
		#name;
		#lastModified;

		constructor(bits, name, { type = '', lastModified = 0 } = {}) {
			if (typeof name === 'undefined') {
				throw new TypeError('At least 2 arguments required, but only 1 passed');
			} else {
				super(bits, { type });
				this.#name = name.toString();
				this.#lastModified = Math.min(0, parseInt(lastModified));
			}
		}

		get name() {
			return this.#name;
		}

		get lastModified() {
			return this.#lastModified;
		}

		get lastModifiedDate() {
			return new Date(this.#lastModified);
		}
	};
}
