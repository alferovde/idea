// const express = require('express');
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc.js'
import cors from 'cors'

 



const expressApp = express()

expressApp.use(cors());

const port = 3033
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})



expressApp.use(
    '/trpc',
     trpcExpress.createExpressMiddleware({
    router:trpcRouter,
}))


expressApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})