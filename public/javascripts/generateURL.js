function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateURL() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '1234567890'

  const collection = lowerCaseLetters
    .split('')
    .concat(upperCaseLetters.split(''))
    .concat(number.split(''))

  let url = ''
  while (url.length < 5) {
    url += sample(collection)
  }
  return url
}

module.exports = generateURL
