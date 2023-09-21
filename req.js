export const req = new Request('https://developer.mozilla.org/dne', {
	'credentials': 'include',
	'headers': {
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/117.0',
		'Accept': '*/*',
		'Accept-Language': 'en-US,en;q=0.5',
		'Content-Type': 'multipart/form-data; boundary=---------------------------9955979014463054702928636363',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-origin',
		'Sec-GPC': '1'
	},
	'body': '-----------------------------9955979014463054702928636363\r\nContent-Disposition: form-data; name="file1"; filename="file1.txt"\r\nContent-Type: text/plain\r\n\r\nHello, World!\nLorem Ipsum\r\n-----------------------------9955979014463054702928636363\r\nContent-Disposition: form-data; name="file2"; filename="empty.txt"\r\nContent-Type: text/plain\r\n\r\n\r\n-----------------------------9955979014463054702928636363\r\nContent-Disposition: form-data; name="foo"\r\n\r\nbar\r\n-----------------------------9955979014463054702928636363\r\nContent-Disposition: form-data; name="bar"\r\n\r\nbazz\r\n-----------------------------9955979014463054702928636363--\r\n',
	'method': 'POST',
	'mode': 'cors'
});
