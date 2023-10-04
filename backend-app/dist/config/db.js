"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticles = exports.getConnectionInfo = exports.connectClient = void 0;
const mongodb_1 = require("mongodb");
let client;
async function connectClient() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;
    client = new mongodb_1.MongoClient(uri);
    console.log('MongoDB URI:', uri);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASS:', process.env.DB_PASS);
    console.log('DB_HOST:', process.env.DB_HOST);
    try {
        await client.connect();
        return Promise.resolve('connected');
    }
    catch (e) {
        console.error(e);
        return Promise.resolve('disconnected');
    }
}
exports.connectClient = connectClient;
function getConnectionInfo() {
    return connectClient();
}
exports.getConnectionInfo = getConnectionInfo;
async function getArticles(sortBy = '_id') {
    try {
        const sortParams = {};
        sortParams[sortBy] = 1;
        const articles = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .find()
            .sort(sortParams)
            .toArray();
        return articles;
    }
    catch (e) {
        console.error(e);
        return [];
    }
}
exports.getArticles = getArticles;
//# sourceMappingURL=db.js.map