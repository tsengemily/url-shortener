const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originurl: String,
  shorturl: String,
})

module.exports = mongoose.model('URL', urlSchema)
