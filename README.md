# `@shgysk8zer0/http`
A JavaScript library that provides various utilities for working with HTTP

[![CodeQL](https://github.com/shgysk8zer0/node-http/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/shgysk8zer0/http/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/shgysk8zer0/node-http/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/shgysk8zer0/node-http/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/shgysk8zer0/node-http.svg)](https://github.com/shgysk8zer0/node-http/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/shgysk8zer0/node-http.svg)](https://github.com/shgysk8zer0/node-http/commits/master)
[![GitHub release](https://img.shields.io/github/release/shgysk8zer0/node-http?logo=github)](https://github.com/shgysk8zer0/node-http/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@shgysk8zer0/http)](https://www.npmjs.com/package/@shgysk8zer0/http)
![node-current](https://img.shields.io/node/v/@shgysk8zer0/http)
![npm bundle size gzipped](https://img.shields.io/bundlephobia/minzip/@shgysk8zer0/http)
[![npm](https://img.shields.io/npm/dw/@shgysk8zer0/http?logo=npm)](https://www.npmjs.com/package/@shgysk8zer0/http)

[![GitHub followers](https://img.shields.io/github/followers/shgysk8zer0.svg?style=social)](https://github.com/shgysk8zer0)
![GitHub forks](https://img.shields.io/github/forks/shgysk8zer0/node-http.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/shgysk8zer0/node-http.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

# Key Features

- Exported constants for common HTTP status codes, such as `ok` for 200.
- An extended `HTTPError` class that inherits from Error.
- Form data parsing that mirrors browser behavior, allowing `formData.get('file')` to return a File object.
- Useful polyfills, including an extended `File` object (derived from `Blob`) and `URL.canParse()` for URL validation.
- A set of constants for commonly used Content-Types.
- A versatile `openLink()` function compatible with various JavaScript environments.
- A `Cookie` class for working with HTTP cookies, enabling easy cookie creation and management.

## Installation

### NPM Installation

```bash
npm i @shgysk8zer0/http
```

### NPM Imports
```js
import { HTTPError } from 'shgysk8zer0/http@shgysk8zer0/http/error.js';
import { NOT_IMPLEMENTED, INTERNAL_SERVER_ERROR } from 'shgysk8zer0/http@shgysk8zer0/http/status.js';
import { JSON } from 'shgysk8zer0/http@shgysk8zer0/http/types.js';
import { Cookie } from 'shgysk8zer0/http@shgysk8zer0/http/cookie.js';
```

### Alternative `import`s

This package is available on [unpkg.com](https://unpkg.com/browse/@shgys8zer0/http/) as a collection of modules, making it easily accessible for browser-based projects.
It is designed to be versatile and is not limited to a specific Node.js environment, ensuring compatibility across various platforms.

```js
import { HTTPError } from 'https://unpkg.com/@shgysk8zer0/http/error.js';
import { NOT_IMPLEMENTED, INTERNAL_SERVER_ERROR } from 'https://unpkg.com/@shgysk8zer0/http/status.js';
import { JSON } from 'https://unpkg.com/@shgysk8zer0/http/types.js';
import { Cookie } from 'https://unpkg.com/@shgysk8zer0/http/cookie.js';
```

### Example Code

```js
export async function handler() {
  try {
    const error = new HTTPError('Not implemented.', {
      status: NOT_IMPLEMENTED,
      cause: new Error('I have not done this yet...'),
    });
    
    throw err;
  } catch (err) {
    if (err instanceof HTTPError) { // Error has an HTTP status & message for use by client
      return Response.json(error, {
        status: error.status,
        headers: new Headers({
          'Content-Type': JSON,
          'Set-Cookie': new Cookie('uid', crypto.randomUUID(), {
            domain: 'example.com',
            path: '/foo',
            maxAge: 86_400_000,
            sameSite: 'Strict',
            httpOnly: true,
            partitioned: true,
          })
        }),
      });  
    } else { // It is not an HTTPError and may contain sensitive into
      return Response.json({
        error: {
          messsage: 'Something broke :(',
          status: INTERNAL_SERVER_ERROR,
        }
      }, { status: INTERNAL_SERVER_ERROR });
    }
  }  
}
```
