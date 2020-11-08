const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
  


  type Query {
    books: [Book!]!
    book(title: String!): Book!
  }

  type Mutation {
      createBook(title: String!, author: String!): Book!
  }

  type Book {
    title: String!
    author: String!
  }

`;

let books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  

const resolvers = {
    Query: {
      books: () => books,
      book: (_, {title}) => books.find(item => item.title === title)
    },
    Mutation: {
        createBook: (_, {title, author}) => {
            const newBook = {
                title: title,
                author: author,
            }
            books.push(newBook)
            return newBook
        }
    }
  };

  
const server = new ApolloServer({ 
    typeDefs, 
    resolvers 
});


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
