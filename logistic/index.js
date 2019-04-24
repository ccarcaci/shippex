const http = require("http")
const https = require("https")
const url = require("url")
const fs = require("fs")
const hops = require("./mocks/hops.json")

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/certs/privkey.pem`),
  cert: fs.readFileSync(`${__dirname}/certs/certificate.crt`),
}

const httpPort = 3000
const httpsPort = 4443

const routing = (request, response) => {
  const action = url.parse(request.url)

	if(action.pathname === "/") {
		response.writeHead(200, { "Content-Type": "text/plain" })
    response.write("Try with /hops")
    response.end()

    return
	} else if(action.pathname === "/hops" && request.method === "POST") {
		response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(hops))
    response.end()

    return
  }

  response.writeHead(404)
  response.end()
}

const httpServer = http.createServer((req, res) => routing(req, res))
const httpsServer = https.createServer(httpsOptions, (req, res) => routing(req, res))

httpServer.listen(httpPort, () => { console.log(`HTTP Server on port ${httpPort}`) } )
httpsServer.listen(httpsPort, () => { console.log(`HTTPS Server on port ${httpsPort}`) })

// Server functions
