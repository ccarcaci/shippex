cd ../back-end
npm run pact
cd ../logistic
npm run pact

cd ../compose
docker-compose stop
docker-compose up
