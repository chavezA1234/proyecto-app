'use strict'

const fp = require('fastify-plugin')
const stripHtml = require('string-strip-html')

module.exports = fp(function (fastify, opts, next) {
  fastify.decorate('stripHtml', str => {
    const stripped = stripHtml(str)
    return stripped.result
  })

  if (opts.stripFromResponse) {
    const hook = async (request, reply, payload) => {
      if (typeof payload === 'string') {
        const strippedPayload = fastify.stripHtml(payload)
        return strippedPayload
      }
      return payload
    }
    fastify.addHook('onSend', hook)
  }

  next()
})
