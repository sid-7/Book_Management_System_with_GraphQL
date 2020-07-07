const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // for using the graphiql tool to test the queries
}));


app.listen(4000, () => {
    console.log("Now listening for requests on port 4000");
})