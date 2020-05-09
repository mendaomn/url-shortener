const express = require('express')
const { redirects } = require('./redirects.json')

const app = express()

app.get('*', (req, res) => {
  const { path } = req
  const url = redirects[path]

  return url ? res.redirect(url) : res.status(404).send()
})

module.exports = app.listen(8080, function onStart() {
  console.log(`Server up`)
})
