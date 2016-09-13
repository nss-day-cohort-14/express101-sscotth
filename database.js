'use strict'

const { MongoClient: { connect } } = require('mongodb')

const MONGODB_URL = 'mongodb://localhost:27017/pizzadescott'

let db

module.exports.connect = () => connect(MONGODB_URL).then(_db => db = _db)
module.exports.db = () => db
