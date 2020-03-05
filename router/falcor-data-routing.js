
const server = process.env.DBSERVER
const Couchdb = require('../db');
const express = require('express');
const app = express.Router();
const falcorExpress = require('falcor-express');
const Router = require('falcor-router');

// db.createIndex({ index: { fields: [name] } })

app.get('/:filename',middle,(req,res)=>{
    console.log('REQ', req.params.filename);
    anotherFunc(function(resp){
        console.log('resp','resp');

        res.status(200).send({resp:'resp'});
    })
})

function middle(some){
    console.log('middle: ', some);

}


function anotherFunc(callback){
    console.log('anotherFunc');

    callback('callback');
}

module.exports = app;