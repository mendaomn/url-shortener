const axios = require('axios')
const { redirects } = require('../redirects.json')

let server

beforeAll(() => {
  server = require('../index')
})

afterAll(() => {
  server.close()
})

Object.entries(redirects).forEach(([from, to]) => {
  test(`should redirect ${from} --> ${to}`, async () => {
    const response = await axios.get(`http://localhost:8080${from}`)

    expect(response.request.res.responseUrl).toBe(to)
  })
})

test(`should 404 if redirect doesn't exist`, async () => {
  const response = await axios.get(`http://localhost:8080/this-doesnt-exist`, {
    validateStatus: false,
  })

  expect(response.status).toBe(404)
})
