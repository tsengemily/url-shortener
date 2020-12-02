const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`)
})
