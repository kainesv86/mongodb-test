const MongoClient = require("mongodb").MongoClient;
const mongodbURI = require("mongodb-uri");

let _db;
const url = "mongodb://localhost:27017/";

module.exports = function (dbName) {
        MongoClient.connect(url, (error, result) => {
                const dbInfo = mongodbURI.parse(url);
                console.log(`Connect to mongodb on host ${dbInfo.hosts[0].host}`);
                _db = result.db(dbName);
        });
};

module.exports.getDB = () => {
        if (!_db) {
                console.log("You have to initialize DB");
                return;
        }
        return _db;
};
