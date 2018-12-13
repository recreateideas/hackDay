const mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    Server = mongodb.Server;

let _remoteMongoInstance, _db, _dbName, _mongoClient, _mongoPort, _hostName;

module.exports = {

    connectToDB: (callback) => {
        try {
            _dbName = 'hackday';
            _hostName = 'localhost';
            _mongoPort = '27017';
            _remoteMongoInstance = 'mongodb';
            const mongoUrl = `${_remoteMongoInstance}://${_hostName}:${_mongoPort}/${_dbName}`;
            const options = {
                auto_reconnect: false,
                ssl: false,
            };
            const server = new Server(_hostName, _mongoPort, options)
            mongoConnect(server, mongoUrl, callback);
        } catch (err) {
            console.log('CONNECTTODB',err);
            callback(err);
        }
    },

    getClient: () => {
        return _mongoClient;
    },

    getDB: () => {
        return _db;
    },

    getMongoPort: () => {
        return _mongoPort;
    },

    getHostName: () => {
        return _hostName;
    },

    getDBName: () => {
        return _dbName;
    }
};

const mongoConnect = (server, mongoUrl, callback) => {
    try {
        _mongoClient = MongoClient;
        _mongoClient.connect(mongoUrl,{ useNewUrlParser: true }, (err, client) => {
            if (client) {
                _db = client.db(_dbName);
                _mongoClient = client;
                console.log(`Connected to db...${mongoUrl}`);
            }
            if (err) console.log('MONGOCONNECT ',err);
            return callback(err);
        });
    }
    catch (err) {
        console.log('MONGOCONNECT ',err);
    }
};
