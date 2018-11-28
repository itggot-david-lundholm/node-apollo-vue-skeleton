// import "babel-polyfill"

import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import http from 'http'

import { ApolloServer, AuthenticationError } from 'apollo-server-express'

import typeDefs from './schema'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import models, {sequelize} from './models'
import { createUsersWithMessages, createMessageBulk } from './schema/seeder';

const app = express()

app.use(cors())

const getMe = async req => {
    const token = req.headers['x-token']

    if(token){
        try{
            jwt.verify(token, process.env.SECRET)
            return await jwt.verify(token, process.env.SECRET)
        }catch(e){
            console.log(e)
            throw new AuthenticationError('Your session expired. Sign in again.')
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    
    context: async ({req, connection}) => {
        if(connection){
            return {models}
        }
        if(req){
            const me = await getMe(req)
            return {
                models,
                me,
                secret: process.env.SECRET
            }
        }
    },
});

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then( async () => {

    if (eraseDatabaseOnSync) {
        await createUsersWithMessages()
        const user = await models.User.findAll({
            where: {
                username: 'rwieruch'
            }
        })
        await createMessageBulk(user)
    }
    
    httpServer.listen({ port: 8000 }, () => {
        console.log('Apollo Server on http://localhost:8000/graphql')
    })
})

