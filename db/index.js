/**
 * Couchdb Api
 */

const
    Pouchdb = require('pouchdb-node');
    [
        
        require('pouchdb-find'),
        require('pouchdb-upsert'),
        require('pouchdb-adapter-memory'),
        require('pouchdb-adapter-http')
    ].forEach(adapter=>Pouchdb.plugin(adapter));

module.exports = Pouchdb;


