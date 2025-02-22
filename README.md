## Boostraping Microservicios -> Book
### Chap-2 - Creating our first Microservices
- [Code - github](https://github.com/bootstrapping-microservices/chapter-2.git)
- nodemon - fs.stat - fs.createRedSteam.pipe -> learn more about streams
### Chap-3 - Publishing Your First Microservice
- `$ docker build -t fixtube .`
- `$ docker run -dp 4000:4000 fixtube`
- `docker logs <container-id>`
- `docker login -> jordanhuaman -> alexanderelcracken123`
- `docker push fixtube`
- `$ docker tag fixtube bmdk21.azurecr.io/fixtube:latest`
- `$ docker push bmdk21.azurecr.io/fixtube:latest`
- `docker run -dp 4000:4000  bmdk21.azurecr.io/fixtube:latest`
- `docker rmi 9c475d6b1dc8 --force`
- `docker-compose up --build`
### Chap-4 Gestión de datos para microservicios
- Create 2 subdirectory to manage docker-compose
- go to -> `video?path=SampleVideo_1280x720_1mb.mp4`
- [Http.request -> read more about it](https://nodejs.org/docs/latest/api/http.html#httprequestoptions-callback)