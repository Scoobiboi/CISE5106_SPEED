import { MongoClient, ObjectId } from 'mongodb';

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

export async function getArticlesStatus(status) {
  try {
    const articles = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .find({ Moderation_status: status })
      .toArray();
    return articles;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//Update status
export async function updateArticleStatus(id, status, reason) {
  try {
    const result = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { Moderation_status: status, Moderation_reason: reason } },
      ); // Convert id to ObjectId
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Insert New Article
export async function addArticle(article) {
  try {
    const result = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .insertOne(article);
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Search Articles by Title
export async function searchArticlesByTitle(title) {
  try {
    const articles = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .find({ title: { $regex: title, $options: 'i' } })
      .toArray();
    return articles;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//New Rating
export async function rateArticle(id, newRating) {
  try {
    console.log(id, newRating);
    const article = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .findOne({ _id: new ObjectId(id) });

    const updatedRating = Math.round(
      (article.Rating * article.no_Ratings + newRating) /
        (article.no_Ratings + 1),
    );
    const updatedNoRatings = article.no_Ratings + 1;
    console.log(updatedRating);
    const result = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { Rating: updatedRating, no_Ratings: updatedNoRatings } },
      );
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Update Article Evidence
export async function updateArticleEvidence(id, newEvidence) {
  try {
    const article = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .findOne({ _id: new ObjectId(id) });

    const updatedEvidence = article.Evidence + ' | ' + newEvidence;

    const result = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { Evidence: updatedEvidence } },
      );
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Insert New User
export async function addUser(user) {
  try {
    // Set default role if not provided
    if (!user.Role) {
      user.Role = 'user';
    }

    const result = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Users')
      .insertOne(user);
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Find User
export async function findUser(email, password) {
  try {
    const user = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Users')
      .findOne({ Email: email, Password: password });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
}
