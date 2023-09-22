import { FORM_MULTIPART, FORM_URL_ENCODED } from './types.js';

const PATTERN = /^(\r\n)*(?:Content-Disposition:\s*form-data;\s*name="(?<name>[^"]*)";?)(?:\s*filename="(?<filename>[^"]*)")?;?(?:\r\nContent-Type:\s*(?<contentType>[^\r\n]+))?;?(\r\n){2}(?<data>[^]*)?(\r\n)$/i;

/**
 * Parse multipart/form-data and create a FormData object from a Response object.
 * @param {Request|Response} response - The Response object containing headers and body.
 * @see https://datatracker.ietf.org/doc/html/rfc7578
 * @returns {Promise<FormData>} - A promise that resolves to a FormData object.
 */

export async function parseMultipartFormData(response) {
	const contentType = response.headers.get('Content-Type');
	const body = await response.text();

	if (typeof contentType !== 'string' || ! contentType.startsWith(FORM_MULTIPART)) {
		throw new Error(`Invalid Content-Type, expected ${FORM_MULTIPART}`);
	}

	const boundary = contentType.split(';')[1].trim().split('=')[1];
	const formData = new FormData();

	for (const part of body.split(`--${boundary}`)) {
		// End of body will be `--${boundary}--`, so final part will be "--" with newlines.
		if  (part.trim().length > 2) {
			const { name, filename, contentType, data = '' } = PATTERN.exec(part)?.groups ?? {};

			if (typeof filename === 'string') {
				formData.append(name, new File([data], filename, { type: contentType ?? 'application/octet-stream' }));
			} else {
				formData.append(name, data);
			}
		}
	}

	return formData;
}


/**
 * Parse application/x-www-form-urlencoded data from a Response object.
 * @param {Request|Response} response - The Response object containing headers and body.
 * @returns {Promise<FormData>} - A promise that resolves to a FormData object.
 */
export async function parseUrlEncodedFormData(response) {
	const contentType = response.headers.get('Content-Type');
	const body = await response.text();

	if (typeof contentType !== 'string' || ! contentType.startsWith(FORM_URL_ENCODED)) {
		throw new Error(`Invalid Content-Type, expected ${FORM_URL_ENCODED}`);
	}

	const params = new URLSearchParams(body);
	const data = new FormData();

	for (const [key, value] of params) {
		data.append(key, value);
	}

	return data;
}
