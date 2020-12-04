const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const generateURL = require('../../public/javascripts/generateURL')

const host = 'http://localhost:3000/'

//首頁
router.get('/', (req, res) => {
  res.render('index')
})

//提交表單
router.post('/', (req, res) => {
  const inputurl = req.body.inputurl

  //比對資料
  URL.find({ originurl: inputurl })
    .lean()
    .then((url) => {
      if (url.length === 0) {
        //產生shorturl
        const shorturl = generateURL()
        //檢查新生成的shorturl是否已存在
        URL.find({ shorturl: shorturl })
          .lean()
          .then((urls) => {
            while (urls.some((url) => url.shorturl === shorturl)) {
              shorturl = generateURL()
            }
          })
        URL.create({
          originurl: inputurl,
          shorturl: shorturl,
        }).then(() => res.render('index', { shorturl, host }))
      } else {
        const shorturl = url[0].shorturl
        res.render('index', { shorturl, host })
      }
    })
})

module.exports = router
