const {getDB,connectToDB,getClient} = require('../utils/dbUtils');

const dbConnection = async () => {
    try {
        mongoClient = await connectToDB(err => {
            if (err) {
                return {
                    status: 'Error',
                };
            } else {
                getDB().listCollections().toArray((err, collections) => {
                    if (err) {
                        return {status: 'Error',};
                    } else {
                        return {status: 'Success',};
                    }
                });
            }
        });
        
    } catch (err) {
        return {
            status: 'Error',
        };
    }
};

const dbClose = () => {
    mongoClient = getClient();
    mongoClient.close(() => {
        console.log('MongoDB connection closed');
        return {
            status: 'Disconnected',
        };
    });
};

exports.handleConnection = async (req, res) => {
    const {connectionType} = req.body;
    switch (connectionType) {
        case 'connect':
            await dbConnection();
            break;
        case 'disconnect':
            await dbClose();
            break;
        default:
            break;
    }
};
