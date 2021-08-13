import 'dotenv/config'
import { ApolloError, ApolloServer } from 'apollo-server-express'
import { applyMiddleware } from "graphql-middleware"; 

import express from 'express'
import mongoose  from 'mongoose'
import consola from 'consola'
import {authShield, validateToke} from './utils/authShield'
import schema from './graphql/schemasMap'
import * as Models from './models'

const app = express()

const PORT = process.env.PORT

const server = new ApolloServer({
    schema: applyMiddleware(
        schema, authShield
    ),
    context:({ req }) => {
        if(!req?.headers?.authorization){
            return Models
        }else{
            validateToke(req?.headers?.authorization).then(user => {
                return {user, Models}
            })
        }
    }
})

server.applyMiddleware({app, path: '/graphql'})
const startUp = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        consola.success({badge: true, message: `🚀  DB CONECTED`})
        app.listen(PORT, () => {
            consola.success({badge: true, message: `🚀 Server up and running on http://localhost:${PORT}/graphql`})
        })
    } catch (error) {
        consola.error({badge: true, message: error.message})
    }
}
startUp()