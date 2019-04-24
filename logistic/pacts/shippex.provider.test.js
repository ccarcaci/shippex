// ./pact/provider_tests.js
const { Verifier } = require("@pact-foundation/pact");
const packageJson = require("../package.json");

let opts = {
    providerBaseUrl: "http://localhost:3000",
    pactUrls: [ `${process.cwd()}/../contracts/shippex-consumer-shippex-provider.json` ],
    provider: "shippex-provider",
    publishVerificationResult: true,
    providerVersion: packageJson.version,
    providerStatesSetupUrl: "http://localhost:3000/provider-state"
}

new Verifier().verifyProvider(opts).then(function () {
    console.log("Pacts successfully verified!");
})
