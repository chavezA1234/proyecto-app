const t = require('tap')
const Fastify = require('fastify')

function buildFastify (t) {
  const fastify = Fastify({ logger: false })
  t.tearDown(() => fastify.close())
  return fastify
}

t.test('fastify-strip-html', async t => {
  t.test('without options', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../strip-html'))
      t.true('stripHtml' in fastify, 'should register a "stripHtml" function')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw an error')
    }
  })

  t.test('calling "stripHtml"', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../strip-html'))
      const res = fastify.stripHtml('<a>Hello</a>')
      t.equal(res, 'Hello', 'should strip HTML tags')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw an error')
    }
  })

  t.test('using "stripFromResponse" option', async t => {
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../strip-html'), {
        stripFromResponse: true
      })
      fastify.get('/', async (req, res) => '<a>Hello</a>')
      const res = await fastify.inject('/')
      t.equal(res.payload, 'Hello', 'should strip HTML tags out from the response payload')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw an error')
    }
  })
})
