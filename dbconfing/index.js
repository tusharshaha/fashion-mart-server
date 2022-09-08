const { MongoClient } = require("mongodb");
require("dotenv").config();

// set mogodb user name and password for connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2xl13.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// connect to mongodb
(async () => await client.connect())();

// create database for fashion  mart
const database = client.db('fashionMart');

module.exports = { database }