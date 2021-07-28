import express from 'express'

const app = express()

app.get('/hello', (req, res) => res.send('hello world from cules coding'))

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))
