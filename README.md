# Grace Chatbot

Grace Chatbot, project designed to answer doctors questions about their patients using a chatbot app connected to neo4j database

## Technologies used

### Prerequisites
Node.JS (last stable version)
Docker (only if you want to use Docker way of running the project)

### Backend
Backend is developed using Express framework and Typescript. To start backend, fill the .example.env using your LUIS API key and production endpoint and your Neo4J database access data and rename it to .env file, then run `cd backend & npm install & npm start`

### Frontend
Frontend is developed using HTML/CSS/JS and statically rendered using SSR. To start frontend run `cd frontend & npm install & npm start`

### Launching the project using Docker
To launch the project fill out the .example.env file using your LUIS API key and production endpoint and your Neo4J database access data and rename it to .env, then run `make up`.

### Testing
A comprehensive suite of unit, integration and E2E tests is provided, to run unit and integration tests use command `cd backend & npm run test` 

To run E2E tests follow the steps:
1) Install Cypress using `npm install -g cypress`
2) Install Cypress executables using `cypress install`
3) Start frontend and backend server
4) Run command `cd frontend & npm run test:e2e`.

## Structure

- .github - Github CI/CD files
- backend - backend files
- frontend - frontend files
