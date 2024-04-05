


// https://hono.dev/api/routing#routing-with-hostname
// 


import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { upgradeWebSocket } from 'hono/cloudflare-workers'
// https://hono.dev/helpers/html
import { html, raw } from 'hono/html'
//import { logger } from 'hono/logger'

const port = 3000;

const app = new Hono()
//app.use(logger())
app.use('/*', serveStatic({ root: './public' }))
//app.get('/', (c) => c.text('Hono!'))
app.get('/', (c) => c.html('html'))

//console.log(`Web Server listen on http://127.0.0.1:${port}`)

//serve(app) //default port 3000
serve({
  fetch:app.fetch,
  port:port
}, (info) => {
  console.log(info);
  console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
})

//export default app

// import http from 'http';
// console.log("init");

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('Hello World!');
//   res.end();
// }).listen(3000);