const axios = require("axios")
const adapter = require("axios/lib/adapters/http")

var baseUrl = "http://mock.hero.dev"
var port = 80

function createHero(name, superpower, universe) {
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

export default { createHero, baseUrl, port };
