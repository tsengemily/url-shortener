const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const generateURL = require('../../public/javascripts/generateURL')

const host = process.env.PORT
  ? 'https://desolate-bastion-74565.herokuapp.com/'
  : 'http://localhost:3000/'

//首頁
router.get('/', (req, res) => {
  res.render('index')
})

//提交表單
router.post('/', (req, res) => {
  const inputurl = req.body.inputurl

  //比對資料，回傳短網址
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
    .catch((error) => console.log(error))
})

//短網址導回原本網頁
router.get('/:shorturl', (req, res) => {
  const shorturl = req.params.shorturl
  URL.find({ shorturl: shorturl })
    .lean()
    .then((shorturl) => {
      if (shorturl.length === 0) {
        return res.render('index', { error: '這個短網址不存在!' })
      } else {
        res.redirect(shorturl[0].originurl)
      }
    })
    .catch((error) => console.log(error))
})

module.exports = router
