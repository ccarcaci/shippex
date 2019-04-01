const { Verifier } = require("@pact-foundation/pact")
const packageJson = require("../package.json")

let opts = {
  providerBaseUrl: "http://localhost:8080",
  pactUrls: "../mocks"
}
