const axios = require("axios")
const adapter = require("axios/lib/adapters/http")

var baseUrl = "http://localhost"
var port = 8080

const createHero = (name, superpower, universe) => {
  const data = {
    "superpower": superpower,
    "name": name,
    "universe": universe
  }

  return axios.request({
    method: "POST",
    url: "/heroes",
    baseURL: `${baseUrl}:${port}`,
    headers: {
      "Accept": "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    data: data
  }, adapter)
}

module.exports = { createHero, baseUrl, port }
