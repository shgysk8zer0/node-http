import { FORM_MULTIPART, FORM_URL_ENCODED, OCTET_STREAM } from './types.js';

const PATTERN = /^(\r\n)?(?:Content-Disposition:\s?form-data;\s?name="(?<name>[^"]*)";?)(?:\s?filename="(?<filename>[^"]*)")?;?(?:\r\nContent-Type:\s?(?<contentType>[^\r\n]+))?;?(\r\n){2}(?<data>[^])?(\r\n)?$/i;

/**
 * Parse a multipart/form-data body and extract form fields and files.
 *
 * @deprecated This function is potentially vulnerable to ReDoS attacks and is not necessary in node >= 20
 * @see https://github.com/shgysk8zer0/node-http/issues/2
 * @param {string} body - The raw string of the multipart/form-data body.
 * @param {string} contentType - The Content-Type header specifying the boundary.
 * @returns {FormData} - A FormData object containing the parsed data.
 * @throws {TypeError} - If the body or contentType is not a string.
 * @throws {Error} - If the contentType is not valid for multipart/form-data.
 */
export function parseMultipartFormData(body, contentType) {
	console.warn('parseMultipartFormData() is deprecated and will be removed in version 2.0.0');

	if (typeof body !== 'string') {
		throw new TypeError('body must be a string.');
	} else	if (typeof contentType !== 'string') {
		throw new TypeError('contentType must be a string.');
	} else if (! contentType.startsWith(FORM_MULTIPART)) {
		throw new Error(`Invalid Content-Type, expected ${FORM_MULTIPART}`);
	}

	const boundary = contentType.split(';')[1].trim().split('=')[1];
	const formData = new FormData();

	for (const part of body.split(`--${boundary}`)) {
		// End of body will be `--${boundary}--`, so final part will be "--" with newlines.
		if  (part.trim().length > 2) {
			const { name, filename, contentType, data = '' } = PATTERN.exec(part)?.groups ?? {};

			if (typeof filename === 'string') {
				formData.append(name, new File([data], filename, { type: contentType ?? OCTET_STREAM }));
			} else {
				formData.append(name, data);
			}
		}
	}

	return formData;
}

/**
 * Parse a URL-encoded form data body and convert it into FormData.
 *
 * @param {string} body - The raw string of the URL-encoded form data body.
 * @param {string} contentType - The Content-Type header specifying the encoding.
 * @returns {FormData} - A FormData object containing the parsed data.
 * @throws {TypeError} - If the body or contentType is not a string.
 * @throws {Error} - If the contentType is not valid for URL-encoded form data.
 */
export function parseUrlEncodedFormData(body, contentType) {
	if (typeof body !== 'string') {
		throw new TypeError('body must be a string.');
	} else	if (typeof contentType !== 'string') {
		throw new TypeError('contentType must be a string.');
	} else if (! contentType.startsWith(FORM_URL_ENCODED)) {
		throw new Error(`Invalid Content-Type, expected ${FORM_URL_ENCODED}`);
	}

	const params = new URLSearchParams(body);
	const formData = new FormData();

	for (const [key, value] of params) {
		formData.append(key, value);
	}

	return formData;
}

/**
 * Parse the raw body data based on the content type and return it as FormData.
 *
 * @param {string} body - The raw body data to be parsed.
 * @param {string} contentType - The Content-Type header specifying the encoding.
 * @returns {FormData} - A FormData object containing the parsed data.
 * @throws {TypeError} - If the body or contentType is not a string.
 * @throws {Error} - If the contentType is not supported or invalid.
 */
export function parseFormData(body, contentType) {
	if (typeof contentType !== 'string') {
		throw new TypeError('contentType must be a string.');
	} else if (typeof body !== 'string') {
		throw new TypeError('body must be a string.');
	} else if (contentType.startsWith(FORM_MULTIPART)) {
		return parseMultipartFormData(body, contentType);
	} else if (contentType === FORM_URL_ENCODED) {
		return parseUrlEncodedFormData(body, contentType);
	} else {
		throw new Error(`Unsupported contentType: ${contentType}`);
	}
}
