import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import schema from './graphql/schemasMap'
const PORT = 4000
const app = express()

const server = new ApolloServer({
    schema
})
server.applyMiddleware({app, path: '/graphql'})

app.listen(PORT, () => {
    console.log(`\n🚀  Server up and running on http://localhost:${PORT}/graphql`)
})