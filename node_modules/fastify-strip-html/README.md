# fastify-strip-html

A plugin to automatically strip HTML tags from response payload

![Node.js CI](https://github.com/heply/fastify-strip-html/workflows/Node.js%20CI/badge.svg)

## Install

```bash
$ npm i --save fastify-strip-html
```

## Usage

```js
fastify.register(require('fastify-strip-html'), {
  stripFromResponse: true
})

// To test it manually:

console.log(fastify.stripHtml('<a>Hello World</a>'))

// <a>Hello World</a> -> Hello World
```

## Options

| Name                  | Description                                                            |
|-----------------------|------------------------------------------------------------------------|
| `stripFromResponse`   | Register a `onSend` hook to strip HTML tags out from a string payload. |

## Test

```bash
$ npm test
```

## Acknowledgements

This project is kindly sponsored by:

[![heply](https://raw.githack.com/heply/brand/master/heply-logo.svg)](https://www.heply.it)

## License

Licensed under [MIT](./LICENSE)
