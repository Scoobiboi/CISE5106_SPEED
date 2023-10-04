import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;
let client;

export async function connectClient() {
  client = new MongoClient(uri);
  try {
    await client.connect();
    return 'connected';
  } catch (e) {
    console.error(e);
    return 'disconnected';
  }
}

export async function getArticles(sortBy = '_id') {
  try {
    const sortParams = {};
    sortParams[sortBy] = 1; // Sort in ascending order
    const articles = await client.db("database").collection("Articles").find().sort(sortParams).toArray();
    return articles;
  } catch (e) {
    console.error(e);
    return [];
  }
}
