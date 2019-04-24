// ./pact/provider_tests.js
const { Verifier } = require("@pact-foundation/pact");
const packageJson = require("../package.json");

let opts = {
  provider: "shippex-provider",
  providerBaseUrl: "http://localhost:3000/",
  pactUrls: [ `${process.cwd()}/../contracts/shippex-consumer-shippex-provider.json` ],
  publishVerificationResult: true,
  providerVersion: packageJson.version,
}

new Verifier(opts).verifyProvider().then(output => {
  console.log(output)
}).catch(error => {
  console.log(error.message)
});
