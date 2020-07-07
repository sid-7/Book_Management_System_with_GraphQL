const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


//dummy data
var books = [
    { name:'This is first book', genre:'fantasy', id:'1', authorId:'1'},
    { name:'This is second book', genre:'fantasy', id:'2', authorId:'2'},
    { name:'This is third book', genre:'sci-fi', id:'3', authorId:'3'},
    { name:'This is fourth book', genre:'fantasy', id:'4', authorId:'2'},
    { name:'This is fifth book', genre:'fantasy', id:'5', authorId:'3'},
    { name:'This is sixth book', genre:'sci-fi', id:'6', authorId:'3'}
];

var authors = [
    { name:'This is first author', age:'fantasy', id:'1'},
    { name:'This is second author', age:'fantasy', id:'2'},
    { name:'This is third author', age:'sci-fi', id:'3'}
];



const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, { id: parent.authorId } );
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: graphql.GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent);
                return _.filter(books, {authorId: parent.id});          
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get the data from db/ other source
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
});