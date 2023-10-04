import { MongoClient } from 'mongodb';

async function connectClient() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;

  const client = new MongoClient(uri);

  try {
    console.log('MongoDB URI:', uri);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASS:', process.env.DB_PASS);
    console.log('DB_HOST:', process.env.DB_HOST);

    // Connect to the MongoDB cluster
    await client.connect();
    return Promise.resolve('connected');
  } catch (e) {
    console.error(e);
    return Promise.resolve('disconnected');
  } finally {
    await client.close();
  }
}

export function getConnectionInfo(): Promise<string> {
  return connectClient();
}
