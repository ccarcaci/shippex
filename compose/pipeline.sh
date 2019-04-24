cd ../back-end
npm i
npm run pact
cd ../logistic
npm i
npm run pact

cd ../compose
docker-compose stop
docker-compose up
