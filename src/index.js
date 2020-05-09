const express = require('express')
const { redirects } = require('./redirects.json')

const app = express()

app.get('*', (req, res) => {
  const { path } = req

  const from = Object.keys(redirects).find((from) => from === path)

  if (!from) {
    return res.status(404).send()
  }

  const to = redirects[from]

  res.redirect(to)
})

module.exports = app.listen(8080, function onStart() {
  console.log(`Server up`)
})
