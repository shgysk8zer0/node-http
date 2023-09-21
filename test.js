import './polyfills/all.js';
import { parseMultipartFormData } from './forms.js';
import { req } from './req.js';

console.log(
	await parseMultipartFormData(req)
		.then(data => Object.fromEntries(data.entries()))
);
