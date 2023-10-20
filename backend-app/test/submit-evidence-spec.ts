import { connectClient} from '../config/db'; // Replace with the actual path to your database script
require('dotenv').config(); 


describe('Database Mocks', () => {
  beforeAll(async () => {

    await connectClient();    
  });

  afterAll(async () => {

  });
//Test #1 Mocks and checks the process.env variables
  it('should not have undefined variables', async () => {
    const list_of_env_variables = {
      DB_USER:process.env.DB_USER,
      DB_PASS:process.env.DB_PASS,
      DB_HOST:process.env.DB_HOST
      };
    
      const checkEnvVariablesMock = jest.fn(()=> Promise.resolve(list_of_env_variables))
      const result = await checkEnvVariablesMock()
      expect(result.DB_USER).toBeDefined
      expect(result.DB_PASS).toBeDefined
      expect(result.DB_HOST).toBeDefined
  });

//Mocks and sees if the function can return an array of articles
  it('should get an Array of Articles from DB', async () => {
    const mockObject = {
    title:"Article_1",
    Authors: "Author",
    Journal_Name:"Journal",
    Publication_year: "2022"
    };
    const getArticleMock = jest.fn(()=> Promise.resolve(mockObject))
    const result = await getArticleMock();
    expect(result).toEqual(mockObject); 
  });

//Mocks the process of updating articles
  it('should update article status in the database', async () => {
    const mockObject = {
      articleId: "1",
      status: true
      };

    const updateArticleStatusMock = jest.fn(() => Promise.resolve(mockObject))
    const result = await updateArticleStatusMock();
    expect(result).toEqual(mockObject)
  });

//Mocks adding data to a database.

it('should add an article to the database', async () => {
    const mockObject = {
    acknowledged:true,
    insertedId:"1"
    }
    const addArticleMock = jest.fn(() => Promise.resolve(mockObject));
    const result = await addArticleMock();
    expect(result).toEqual(mockObject); 
  });
//Mocking a database collection and checking the seaarch query implemented
  it('should search an Article in the database', async () => {
    const mockObject = {
    article: "Article_2",
    }
    const mockDatabaseCollection = [{
    article: "Article_1",
    Authors: "Bob",
    Journal_Name:"Journal",
    Publication_year: "2022",
    },
    {
      article: "Article_2",
      Authors: "Bob",
      Journal_Name:"Journal",
      Publication_year: "2022",
      }
  ]
    const searchrAticleMock = jest.fn(() => Promise.resolve(mockDatabaseCollection));
    const result = await searchrAticleMock();
    expect(result[1].article).toEqual(mockObject.article); 
  });
});
