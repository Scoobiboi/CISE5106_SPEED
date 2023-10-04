import { MongoClient } from 'mongodb';

let client;

export async function connectClient() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;
  client = new MongoClient(uri);
  console.log('MongoDB URI:', uri);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_PASS:', process.env.DB_PASS);
  console.log('DB_HOST:', process.env.DB_HOST);
  try {
    await client.connect();
    return Promise.resolve('connected');
  } catch (e) {
    console.error(e);
    return Promise.resolve('disconnected');
  }
}

export function getConnectionInfo(): Promise<string> {
  return connectClient();
}

export async function getArticles(sortBy = '_id') {
  try {
    const sortParams = {};
    sortParams[sortBy] = 1; // Sort in ascending order
    const articles = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .find()
      .sort(sortParams)
      .toArray();
    return articles;
  } catch (e) {
    console.error(e);
    return [];
  }
}
