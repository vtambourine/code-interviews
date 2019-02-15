const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express()

		server.get('/p/:id', (req, res) => {
			const pagePath = '/post'
			const query = { id: req.params.id}
			app.render(req, res, pagePath, query)
		})

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3000, (err) => {
			if (err) throw err
			console.log('> Ready on http://localhost:3000')
		})
	})
	.catch((error) => {
		console.error(error.stack)
		process.exit(1)
	})
