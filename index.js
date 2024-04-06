/*
  Project Name: tauri_peer
  License: MIT
  Created By: Lightnet

*/

// https://hono.dev/api/routing#routing-with-hostname
// 
import Gun from 'gun';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory'
// import { upgradeWebSocket } from 'hono/cloudflare-workers';
// https://hono.dev/helpers/html
// import { html, raw } from 'hono/html';
// import { logger } from 'hono/logger';

import Hyperswarm from 'hyperswarm';
import Corestore from 'corestore';
import Hyperbee from 'hyperbee';
import b4a from 'b4a'

var config = {
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 3000,
  peers: process.env.PEERS && process.env.PEERS.split(',') || []
};

var isSwarm = false;

function databaseMiddleware({db=null}){
  return createMiddleware(async (c, next) => {
    //c.res.headers.append('db', db);
    c.set('db', db);
    await next();
  })
}


async function main(){
  //const port = 3000;

  // PEER TO PEER SET UP...
  // directory set up folder path
  // const core = new Corestore(Pear.config.storage)
  const store = new Corestore('./corestore');

  if(isSwarm){
    const swarm = new Hyperswarm();
    //Pear.teardown(() => swarm.destroy())
  
    //swarm.on('connection', (conn, info) => {
      // swarm1 will receive server connections
      //conn.write('this is a server connection')
      //conn.end()
    //})

    // replication of corestore instance
    swarm.on('connection', conn => store.replicate(conn))
  }

  //storecore for hyperbee database
  const core = store.get({ name: 'my-bee-core' })
  const db = new Hyperbee(core, { keyEncoding: 'utf-8', valueEncoding: 'json' });

  // wait till all the properties of the hypercore are initialized
  await core.ready();
  console.log("core.key: ",core.key.toString('hex'));

  await db.ready();

  if(isSwarm){
    // join a topic
    const discovery = swarm.join(core.discoveryKey);
    // Only display the key once the Hyperbee has been announced to the DHT
    discovery.flushed().then(() => {
      console.log('bee key:', b4a.toString(core.key, 'hex'));
    })
  }

  // var HBopt = {store: {}};
  // //required put function
  // HBopt.store.put = async function(key, data, cb){
  //   console.log("===PUT===");
  //   console.log("key: ", key);
  //   console.log("data: ", data);
  //   await db.put(''+key, data); //string
  //   // localStorage[''+key] = data;
  //   return cb(null, 1);
  // }
  // //required get function
  // HBopt.store.get = async function(key, cb){
  //   console.log("===GET===");
  //   console.log("key: ",key);
  //   let data = await db.get(''+key);
  //   if(data==null){
  //     return cb(null, undefined);
  //   }
  //   console.log("data:", data);
  //   //console.log("localStorage: ",localStorage.length);
  //   // cb(null, localStorage[''+key])
  //   return cb(null, data?.value);
  // }

  var gunConfig = {
    //web: server.listen(config.port),
    file:false,//disable file save
    peers: config.peers, // peers
    //localStorage:false,// disable ? browser
    //radisk: false, // default true
    axe: false, // default true
    //store:HBopt.store // works
  }

  //var gun = Gun(gunConfig);
  //console.log("gun.opt");
  //console.log(gun.opt);
  // gun.on('hi', peer =>{ 
  //   //console.log('HI > ',peer);
  //   console.log('HI > Peer!');
  // });
  // gun.on('bye', peer =>{ 
  //   //console.log('BYE > ',peer);
  //   console.log('BYE > Peer!');
  // });
  //console.log(gun);

  // =============================================
  // WEB SERVER
  // =============================================

  const app = new Hono();
  //app.use(logger());

  app.use(databaseMiddleware({db:db}));
  app.use('/*', serveStatic({ root: './public' }));
  //app.get('/', (c) => c.text('Hono!'));
  app.get('/', (c) => c.html('html'));

  app.get('/db', (c) => {
    console.log("c.get('db')");
    console.log(c.get('db'));

    return c.html('html')
  });


  app.get('/key/:id', async(c) => {
    const id_key  = c.req.param('id')
    //console.log(await c.req.json())
    //const {key} = await c.req.json();
    if(typeof id_key === 'string' && id_key.length == 0){
      return c.json(JSON.stringify({api:'Length'}));
    }
    try {
      const entry = await db.get(id_key);
      console.log("entry: ", entry);
      return c.json(entry);
    } catch (error) {
      console.log("ERROR");
      return c.json(JSON.stringify({api:'ERROR'}));
    }
  });

  app.post('/key', async(c) => {
    const {key, value} = await c.req.json();
    if((key.length == 0) || value.length == 0){
      return c.json(JSON.stringify({api:'Length'}))  
    }
    try {
      let result = await db.put(key, value);
      console.log("result: " , result)
      return c.json({api:'PASS'});
    } catch (error) {
      console.log("ERROR")
      return c.json({api:'ERROR'});
    }
  });
  
  //console.log(`Web Server listen on http://127.0.0.1:${port}`)

  // serve(app) //default port 3000
  serve({
    fetch:app.fetch,
    port:config.port
  }, (info) => {
    console.log(info);
    console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
  })
}

main();

// export default app

// import http from 'http';
// console.log("init");

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('Hello World!');
//   res.end();
// }).listen(3000);