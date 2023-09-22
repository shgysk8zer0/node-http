if (globalThis.URL instanceof Function) {
	if (! (URL.canParse instanceof Function)) {
		URL.canParse = function(url, base) {
			try {
				new URL(url, base);
				return true;
			} catch {
				return false;
			}
		};
	}
}
