const createHero = require("../hero.build.js")
const Pact = require("@pact-foundation/pact")

describe("HeroService API", () => {
  const heroRequest = {
    "superpower": "flying",
    "name": "Superman",
    "universe": "DC"
  }
  const heroResponse = {
    "id": 42,
    "superpower": "flying",
    "name": "Superman",
    "universe": "DC"
  }

  describe("Create Hero", () => {
    beforeEach(done => {
      const contentTypeJsonMatcher = Pact.Matchers.term({
        matcher: "application\\/json; *charset=utf-8",
        generate: "application/json; charset=utf-8"
      })
      global.provider.addInteraction({
        state: "Provider allows hero creation",
        uponReceiving: "A request to create hero",
        withRequest: {
          method: "POST",
          path: "/heroes",
          headers: {
            "Accept": "application/json; charset=utf-8",
            "Content-Type": contentTypeJsonMatcher
          },
          body: heroRequest
        },
        willRespondWith: {
          status: 201,
          headers: {
            "Content-Type": contentTypeJsonMatcher
          },
          body: heroResponse
        }
      }).then(() => done())
    })
    
    it("sending a request according to contract", done => {
      createHero.createHero("Superman", "flying", "DC")
        .then(response => {
          const hero = response.data

          expect(hero.id).toEqual(42)
        })
        .then(() => {
          global.provider.verify()
            .then(() => done(), error => {
              done.fail(error)
            })
        })
    })
  })
})
