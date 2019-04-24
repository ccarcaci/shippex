const axios = require("axios")
const adapter = require("axios/lib/adapters/http")

const baseUrl = process.env.LOGISTIC_ENDPOINT
const port = process.env.LOGISTIC_PORT

const shipment = (from, to) => {
  const data = {
    "from": from,
    "to": to
  }

  return axios.request({
    method: "POST",
    url: "/hops",
    baseURL: `${baseUrl}:${port}`,
    headers: {
      "Accept": "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    data: data
  }, adapter)
}

module.exports = { shipment }
