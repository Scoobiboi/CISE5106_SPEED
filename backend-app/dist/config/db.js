"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionInfo = void 0;
const mongodb_1 = require("mongodb");
async function connectClient() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;
    const client = new mongodb_1.MongoClient(uri);
    try {
        await client.connect();
        return 'connected';
    }
    catch (e) {
        console.error(e);
        return 'disconnected';
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