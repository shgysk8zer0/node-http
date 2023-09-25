import { UNKNOWN_ERROR, FOUND, OK } from '@shgysk8zer0/consts/status.js';
import { JSON as TYPE_JSON } from '@shgysk8zer0/consts/types.js';

if (globalThis.Response instanceof Function) {
	if (! (Response.error instanceof Function)) {
		Response.error = function() {
			return new Response([], {
				status: UNKNOWN_ERROR,
				statusText: '',
			});
		};
	}

	if (! (Response.redirect instanceof Function)) {
		Response.redirect = function(url, status = FOUND) {
			return new Response([], {
				status: status,
				headers: new Headers({ Location: url }),
			});
		};
	}

	if (! (Response.json instanceof Function)) {
		Response.json = function(data,  { status = OK, statusText = '', headers = new Headers() }) {
			if (! (headers instanceof Headers)) {
				return Response.json(data, { status, statusText, headers: new Headers(headers) });
			} else {
				if (! headers.has('Content-Type')) {
					headers.set('Content-Type', TYPE_JSON);
				}

				return new Response([JSON.stringify(data)], { status, statusText, headers });
			}
		};
	}
}
