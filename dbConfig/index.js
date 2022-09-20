const { MongoClient } = require("mongodb");
require("dotenv").config();

// set mogodb user name and password for connection
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// connect to mongodb
(async () => await client.connect())();

// create database for fashion  mart
const database = client.db('fashionMart');

module.exports = { database }