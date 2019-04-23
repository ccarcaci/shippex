jasmine.DEFAULT_TIMEOUT_INTERVAL=10000

beforeAll((done) => {
  global.provider.setup().then(() => done());
});

afterAll((done) => {
  global.provider.finalize().then(() => done());
});
