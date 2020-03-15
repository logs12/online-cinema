import express, { Application } from 'express';
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import errorHandler from "errorhandler";

// Controllers (route handlers)
import * as DataController from "./controllers/Data";
import * as LogsController from "./controllers/Logs";


// Some fake data
const books = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];
  
  // The GraphQL schema in string form
  const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
  `;
  
  // The resolvers
  const resolvers = {
    Query: { books: () => books },
  };
  
  // Put together a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });



// Create Express server
const app: Application = express();

// Express configuration
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  
// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  
app.set("port", process.env.SERVER_PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});


/**
 * Primary app routes.
 */
app.get("/data", DataController.getData);
app.post("/addData", DataController.postData);
app.get("/logs", LogsController.getLogs);
app.post("/addLog", LogsController.postLog);

export default app;