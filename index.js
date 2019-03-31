var http = require("http")
var https = require("https")
var url = require("url")
var fs = require("fs")
var superheroes = require("./mocks/superheroes.json")

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/certs/privkey.pem`),
  cert: fs.readFileSync(`${__dirname}/certs/certificate.crt`),
}

var httpPort = 8080
var httpsPort = 4443

const routing = (request, response) => {
  const action = url.parse(request.url)

	if(action.pathname === "/") {
		response.writeHead(200, { "Content-Type": "text/plain" })
    response.write("Try with /superheroes")
    response.end()
	} else if(action.pathname === "/superheroes" && request.method === "POST") {
		response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(superheroes))
    response.end()
  }

  response.writeHead(404)
  response.end()
}

var httpServer = http.createServer((req, res) => routing(req, res))
var httpsServer = https.createServer(httpsOptions, (req, res) => routing(req, res))

httpServer.listen(httpPort, () => { console.log(`HTTP Server on port ${httpPort}`) } )
httpsServer.listen(httpsPort, () => { console.log(`HTTPS Server on port ${httpsPort}`) })

// Server functions
