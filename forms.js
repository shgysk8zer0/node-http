import { FORM_MULTIPART, FORM_URL_ENCODED } from './types.js';

/**
 * Parse multipart/form-data and create a FormData object from a Response object.
 * @param {Request|Response} response - The Response object containing headers and body.
 * @see https://datatracker.ietf.org/doc/html/rfc7578
 * @returns {Promise<FormData>} - A promise that resolves to a FormData object.
 */

// @TODO Validate boundary
// @TODO Make case-insensitive
// @TODO Check for ReDoS vulnerabilities
// @TODO Improve matching for data
export async function parseMultipartFormData(response) {
	const contentType = response.headers.get('Content-Type');
	const body = await response.text();

	if (typeof contentType !== 'string' || ! contentType.startsWith(FORM_MULTIPART)) {
		throw new Error(`Invalid Content-Type, expected ${FORM_MULTIPART}`);
	}

	const boundary = contentType.split(';')[1].trim().split('=')[1];
	const regexPattern = new RegExp(
		// `--${boundary}\\r?\\n(?:Content-Disposition:\\s*form-data;\\s*name="(?<name>[^"]+)"(?:;\\s*filename="(?<filename>[^"]+)")?(\\r?\\n)?(?:Content-Type:\\s*(?<contentType>[^\\r\\n]+))?);?(\\r?\\n){2}(?<data>.+)`, 'gi'
		`--${boundary}\\r?\\n(?:Content-Disposition:\\s*form-data;\\s*name="(?<name>[^"]+)"(?:;\\s*filename="(?<filename>[^"]+)")?(\\r?\\n)?(?:Content-Type:\\s*(?<contentType>[^\\r\\n]+))?);?(\\r?\\n){2}(?<data>[^]*)(?=\\r?\\n?--${boundary}-?-?)`, 'gi'
		// (?:(?!\\r?\\n--${boundary})[^])*(?<data>)
		// (?s:(?!\\n?--${data}$)(?<data>.*))
	);

	const formData = new FormData();
	for (let match; (match = regexPattern.exec(body)); ) {
		// console.log(match);
		const { name, filename, contentType, data = '' } = match?.groups ?? {};
		console.log({ [name]: data });

		if (typeof filename === 'string') {
			formData.append(name, new File([data], filename, { type: contentType ?? 'application/octet-stream' }));
		} else {
			formData.append(name, data);
		}
	}

	return formData;
}


/**
 * Parse application/x-www-form-urlencoded data from a Response object.
 * @param {Request|Response} response - The Response object containing headers and body.
 * @returns {Promise<object>} - A promise that resolves to an object containing parsed form data.
 */
export async function parseUrlEncodedFormData(response) {
	const contentType = response.headers.get('Content-Type');
	const body = await response.text();

	if (typeof contentType !== 'string' || ! contentType.startsWith(FORM_URL_ENCODED)) {
		throw new Error('Invalid Content-Type, expected application/x-www-form-urlencoded');
	}

	const formData = new URLSearchParams(body);

	// Convert URLSearchParams to a plain object
	const formDataObject = {};
	for (const [key, value] of formData) {
		formDataObject[key] = value;
	}

	return formDataObject;
}
