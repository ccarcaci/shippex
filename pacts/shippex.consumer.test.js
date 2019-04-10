const logistic = require("../logistic.interface.js")
const Pact = require("@pact-foundation/pact")

describe("Communicate with Logistic service", () => {
  describe("Ask to computate hops", () => {
    beforeEach(done => {
      const contentTypeJsonMatcher = Pact.Matchers.term({
        matcher: "application\\/json; *charset=utf-8",
        generate: "application/json; charset=utf-8",
      })

      global.provider.addInteraction({
        state: "Logistic service is able to computate shipment hops",
        uponReceiving: "A request to computate shipment trip",
        withRequest: {
          method: "POST",
          path: "/hops",
          headers: {
            "Accept": "application/json; charset=utf-8",
            "Content-Type": contentTypeJsonMatcher,
          },
          body: {
            "from": "London",
            "to": "Rome"
          }
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": contentTypeJsonMatcher },
          body: {
            hops: [
              "London",
              "Paris",
              "Milan",
              "Rome"
            ]
          }
        },
      }).then(() => done())
    })
  })

  it("Send a request to computate hops", done => {
    logistic.shipment("London", "Rome")
      .then(() => {
        global.provider.verify()
          .then(() => done(), error => {
            done.fail(error)
          })
      })
  })
})
