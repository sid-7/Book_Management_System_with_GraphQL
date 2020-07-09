import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import BookList from './componenents/BookList';

//apolloo client setup
const client = new ApolloClient({
  uri:"http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
          <h1>Book Management System</h1>
          <BookList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
