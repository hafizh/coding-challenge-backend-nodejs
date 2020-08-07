import express from 'express'
import { hello } from './hello'

const app = express()
const port = 3000

app.get('/', (_, res) => {
  res.send(hello('World'))
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
