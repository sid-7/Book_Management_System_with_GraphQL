const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://siddharth:brityourwrit@graphql.rbq3g.mongodb.net/GraphQL?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log("MongoDB connected...");
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // for using the graphiql tool to test the queries
}));


app.listen(4000, () => {
    console.log("Now listening for requests on port 4000");
})