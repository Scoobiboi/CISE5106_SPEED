"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.addUser = exports.updateArticleEvidence = exports.rateArticle = exports.searchArticlesByTitle = exports.addArticle = exports.updateArticleStatus = exports.getArticles = exports.getConnectionInfo = exports.connectClient = void 0;
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
async function updateArticleStatus(id, status, reason) {
    try {
        const result = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { Moderation_status: status, Moderation_reason: reason } });
        return result;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.updateArticleStatus = updateArticleStatus;
async function addArticle(article) {
    try {
        const result = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .insertOne(article);
        return result;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.addArticle = addArticle;
async function searchArticlesByTitle(title) {
    try {
        const articles = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .find({ title: { $regex: title, $options: 'i' } })
            .toArray();
        return articles;
    }
    catch (e) {
        console.error(e);
        return [];
    }
}
exports.searchArticlesByTitle = searchArticlesByTitle;
async function rateArticle(id, newRating) {
    try {
        const article = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        const updatedRating = Math.round((article.Rating * article.no_Ratings + newRating) / (article.no_Ratings + 1));
        const updatedNoRatings = article.no_Ratings + 1;
        const result = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { Rating: updatedRating, no_Ratings: updatedNoRatings } });
        return result;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.rateArticle = rateArticle;
async function updateArticleEvidence(id, newEvidence) {
    try {
        const article = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        const updatedEvidence = article.Evidence + ' | ' + newEvidence;
        const result = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Articles')
            .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { Evidence: updatedEvidence } });
        return result;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.updateArticleEvidence = updateArticleEvidence;
async function addUser(user) {
    try {
        if (!user.Role) {
            user.Role = 'user';
        }
        const result = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Users')
            .insertOne(user);
        return result;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.addUser = addUser;
async function findUser(email, password) {
    try {
        const user = await client
            .db('CISE_SPEED_DATABASE')
            .collection('Users')
            .findOne({ Email: email, Password: password });
        return user;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.findUser = findUser;
//# sourceMappingURL=db.js.map