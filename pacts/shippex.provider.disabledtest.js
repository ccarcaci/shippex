const { Pact } = require("@pact-foundation/pact")
const { api } = (url) => { } // require(/* wherever */)

describe("The API", () => {
  const url = "https://localhost"

  describe("Interaction description", () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: "Request description",
        withRequest: {
          method: "GET",
          path: "/foo/bar",
          query: "",
          headers: {
            Accept: "application/json"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: {}
        }
      }
      return provider.addInteraction(interaction)
    })

    it("Test description", done => {
      api(url).someCall()
        .then(response => {
          expect(response).toEqual()
        })
        .then(done)
    })
  })
})
