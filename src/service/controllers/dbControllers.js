const dbUtils = require('../utils/dbUtils');

let mongoClient, db;

const dbConnection = async () => {
    try {
        mongoClient = await dbUtils.connectToDB(err => {
            if (err) {
                return {
                    status: 'Error',
                    message: `Server Error: ${err}.`,
                    warning: '',
                    Collections: [],
                    isConnected: false
                };
            } else {
                db = dbUtils.getDB();
                const hostName = dbUtils.getHostName();
                const mongoPort = dbUtils.getMongoPort();
                const dbName = dbUtils.getDBName();
                db.listCollections().toArray((err, collections) => {
                    // console.log(collections);
                    if (err) {
                        return {
                            status: 'Error',
                            message: `Server Error: ${err}.`,
                            warning: '',
                            Collections: [],
                            isConnected: false
                        };
                    } else if (collections && collections.length > 0) {
                        return {
                            status: 'Success',
                            message: `Successfully connected to DB '${dbName}' on ${hostName}:${mongoPort}.`,
                            warning: '',
                            Collections: collections,
                            isConnected: true
                        };
                    }
                    else {
                        return {
                            status: 'Success',
                            message: ` Successfully connected to '${dbName}' on ${hostName}:${mongoPort}\n`,
                            warning: `Warning: DB '${dbName}' seems to be empty.`,
                            Collections: collections,
                            isConnected: true
                        };
                    }
                });
            }
        });
        
    } catch (err) {
        return {
            status: 'Error',
            message: `Server Error: ${err}.`,
            warning: '',
            Collections: [],
            isConnected: false
        };
    }
};

const dbClose = () => {
    mongoClient = dbUtils.getClient();
    mongoClient.close();
    console.log('closing connection to MongoDB...');
    mongoClient.close(() => {
        console.log('MongoDB connection closed');
        return {
            status: 'Disconnected',
            message: 'DB disconnected',
            isConnected: false
        };
    });
};

exports.handleConnection = async (req, res) => {
    console.log('handleConnection');
    const connectionType = req.body.connectionType;
    switch (connectionType) {
        case 'connect':
            console.log('connect');
            await dbConnection();
            break;
        case 'disconnect':
            await dbClose();
            break;
        default:
            break;
    }
};
