const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
    { name:'This is first book', genre:'fantasy', id:'1'},
    { name:'This is second book', genre:'fantasy', id:'2'},
    { name:'This is third book', genre:'sci-fi', id:'3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLString}},
            resolve(parent, args){
                // code to get the data from db/ other source
                return _.find(books, {id: args.id});
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
});