const http = require("http")
const https = require("https")
const url = require("url")
const fs = require("fs")
const logistic = require("./logistic.interface")

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/certs/privkey.pem`),
  cert: fs.readFileSync(`${__dirname}/certs/certificate.crt`),
}

var httpPort = 8080
var httpsPort = 4443

const routing = async (request, response) => {
  const action = url.parse(request.url)

	if(action.pathname === "/") {
		response.writeHead(200, { "Content-Type": "text/plain" })
    response.write("Try with /new-shipment")
    response.end()
	} else if(action.pathname === "/new-shipment" && request.method === "POST") {
    const body = JSON.parse(await requestBody(request))
    const from = body.from
    const to = body.to

    // Asynchronous
    logistic.shipment(from, to)

		response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify({ status: "acquired" }))
    response.end()
  }

  response.writeHead(404)
  response.end()
}

const httpServer = http.createServer((req, res) => routing(req, res))
const httpsServer = https.createServer(httpsOptions, (req, res) => routing(req, res))

httpServer.listen(httpPort, () => { console.log(`HTTP Server on port ${httpPort}`) } )
httpsServer.listen(httpsPort, () => { console.log(`HTTPS Server on port ${httpsPort}`) })

// Server functions

const requestBody = request => new Promise((resolve) => {
  let data = ""

  request.on("data", chunk => data += chunk)
  request.on("end", () => resolve(data))
})
