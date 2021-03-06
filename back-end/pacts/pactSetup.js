const path = require("path")
const { Pact } = require("@pact-foundation/pact")

global.port = 3000
global.provider = new Pact({
  port: global.port,
  log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
  dir: path.resolve(process.cwd(), "../contracts"),
  spec: 2,
  cors: true,
  pactfileWriteMode: "update",
  consumer: "shippex-consumer",
  provider: "shippex-provider",
})
