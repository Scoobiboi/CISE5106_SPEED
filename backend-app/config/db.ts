//The previous code is commented out below... 

import { MongoClient, ObjectId } from 'mongodb';

let client;

export async function connectClient() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;
  client = new MongoClient(uri);
  console.log('MongoDB URI:', uri);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_PASS:', process.env.DB_PASSWORD);
  console.log('DB_HOST:', process.env.DB_HOST);
  
  try {
    await client.connect();
    return 'connected';
  } catch (e) {
    console.error(e);
    return 'disconnected';
  }
}

export function getConnectionInfo() {
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

export async function updateArticleStatus(id, status) {
  try {
    const result = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .updateOne({ _id: new ObjectId(id) }, { $set: { Moderation_status: status } }); // Convert id to ObjectId
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

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

export async function rateArticle(id, newRating) {
  try {
    const article = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .findOne({ _id: new ObjectId(id) });
    
    const updatedRating = Math.round((article.Rating * article.no_Ratings + newRating) / (article.no_Ratings + 1));
    const updatedNoRatings = article.no_Ratings + 1;

    const result = await client
      .db('CISE_SPEED_DATABASE')
      .collection('Articles')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { Rating: updatedRating, no_Ratings: updatedNoRatings } }
      );
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}





// import { MongoClient, ObjectId } from 'mongodb';

// let client;

// export async function connectClient() {
//   //remove as string if this doesn't work. 
//   const uri = `mongodb+srv://${process.env.DB_USER as string}:${process.env.DB_PASS as string}@${process.env.DB_HOST as string}/?retryWrites=true&w=majority&appName=AtlasApp`;
//   client = new MongoClient(uri);
//   console.log('MongoDB URI:', uri);
//   console.log('DB_USER:', process.env.DB_USER);
//   console.log('DB_PASS:', process.env.DB_PASS);
//   console.log('DB_HOST:', process.env.DB_HOST);
//   try {
//     await client.connect();
//     return Promise.resolve('connected');
//   } catch (e) {
//     console.error(e);
//     return Promise.resolve('disconnected');
//   }
// }

// export function getConnectionInfo(): Promise<string> {
//   return connectClient();
// }

// export async function getArticles(sortBy = '_id') {
//   try {
//     const sortParams = {};
//     sortParams[sortBy] = 1; // Sort in ascending order
//     const articles = await client
//       .db('CISE_SPEED_DATABASE')
//       .collection('Articles')
//       .find()
//       .sort(sortParams)
//       .toArray();
//     return articles;
//   } catch (e) {
//     console.error(e);
//     return [];
//   }
// }

// //Update status
// export async function updateArticleStatus(id, status) {
//   try {
//     const result = await client
//       .db('CISE_SPEED_DATABASE')
//       .collection('Articles')
//       .updateOne({ _id: new ObjectId(id) }, { $set: { Moderation_status: status } }); // Convert id to ObjectId
//     return result;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// }

// // Insert New Article
// export async function addArticle(article) {
//   try {
//     const result = await client
//       .db('CISE_SPEED_DATABASE')
//       .collection('Articles')
//       .insertOne(article);
//     return result;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// }
  

//   //New Rating
//   export async function rateArticle(id, newRating) {
//     try {
//       const article = await client
//         .db('CISE_SPEED_DATABASE')
//         .collection('Articles')
//         .findOne({ _id: new ObjectId(id) });
      
//       const updatedRating = Math.round((article.Rating * article.no_Ratings + newRating) / (article.no_Ratings + 1));
//       const updatedNoRatings = article.no_Ratings + 1;
  
//       const result = await client
//         .db('CISE_SPEED_DATABASE')
//         .collection('Articles')
//         .updateOne(
//           { _id: new ObjectId(id) },
//           { $set: { Rating: updatedRating, no_Ratings: updatedNoRatings } }
//         );
//       return result;
//     } catch (e) {
//       console.error(e);
//       return null;
//     }
//   }
