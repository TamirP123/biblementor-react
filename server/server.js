const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '../../.env' });
}
const express = require("express");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const PORT = process.env.PORT || 3001;
const app = express();
var cors = require('cors');
app.use(cors());
const path = require('path');
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/biblementor')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// console.log('Stripe Secret Key', process.env.secret); 

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: authMiddleware
});

const startApolloServer = async () => {
    await server.start();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware}
    ));

    // Serve up static assets
    app.use('/images', express.static(path.join(__dirname, '../client/public/assets')));

    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')))
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'))
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`GraphQL listening on http://localhost:${PORT}/graphql`);
        });
    }).on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });
}

startApolloServer();
