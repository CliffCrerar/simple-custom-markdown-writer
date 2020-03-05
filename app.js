// monitor couchdb
process.env.NODE_PATH="."
require('dotenv').config();
const CouchDbApi = require('./db');
const express = require('express');
const database = process.env.DBSERVER;
const db = new CouchDbApi(database+'portfolio-ui');
const app=express();
const {falcorAppRouter,getUrl} = require('./router');
const log = (ev) => console.log(ev);

app.use('/',express.static('./public'));

app.use('/falcor', falcorAppRouter);

app.use('/getcouchaddress',getUrl);

app.all('*',(req,res,next)=>{
  const userAgent = req.headers["user-agent"];
  delete req.headers["user-agent"]
  if(false ){
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
  console.log('Request :', req.method, new Date());
  console.table(req.headers);
  console.log('USER AGENT: ', userAgent);
  }
  next();
})

db.changes({
    since: 'now',
    live: true,
    include_docs: true
  })
  .on('change', log)
  .on('complete', log)
  .on('error',log);





// const falcorExpress = require('falcor-express');
// const Router = require('falcor-router');

// app.use('/falcor.json', falcorExpress.dataSourceRoute(function (req, res) {
//   // create a Virtual JSON resource with single key ('greeting')
//   return new Router([
//     {
//       // match a request for the key 'greeting'
//       route: 'greeting',
//       // respond with a PathValue with the value of 'Hello World.'
//       get: () => ({path: ['greeting'], value: 'Hello World'})
//     }
//   ]);
// }));

app.listen(9000,()=>console.log('App running'));

