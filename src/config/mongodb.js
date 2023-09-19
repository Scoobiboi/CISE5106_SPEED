const { MongoClient } = require("mongodb");

async function connectClient() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://cise-admin:mPtu7zJISmJANUUO@cluster0.jxc0jkc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    return "connected";
  } catch (e) {
    return "disconnected";
    console.error(e);
  } finally {
    await client.close();
  }
}

export function getConnectionInfo() {
  return connectClient();
}
