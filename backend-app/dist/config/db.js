"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionInfo = void 0;
const mongodb_1 = require("mongodb");
async function connectClient() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;
    const client = new mongodb_1.MongoClient(uri);
    try {
        console.log('MongoDB URI:', uri);
        console.log('DB_USER:', process.env.DB_USER);
        console.log('DB_PASS:', process.env.DB_PASS);
        console.log('DB_HOST:', process.env.DB_HOST);
        await client.connect();
        return Promise.resolve('connected');
    }
    catch (e) {
        console.error(e);
        return Promise.resolve('disconnected');
    }
    finally {
        await client.close();
    }
}
function getConnectionInfo() {
    return connectClient();
}
exports.getConnectionInfo = getConnectionInfo;
//# sourceMappingURL=db.js.map