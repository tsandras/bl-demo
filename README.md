# BL demo

### Backend

#### Stack
Node.js Express & Postgresql: CRUD Rest APIs

#### Base
Boilerplate Node.js Express CRUD Rest APIs (without postgresql)

### Frontend

#### Stack
React.js CRUD App with React Router & Axios

#### Base
`npx create-react-app frontend --template typescript`

### Prerequisites
Add `.env` file in root directory, for example:
```
POSTGRES_DB=demo
POSTGRES_USER=demo
POSTGRES_PASSWORD=demo
FE_PORT=3000
BE_PORT=8080
REACT_APP_API_HOST=localhost
REACT_APP_API_PORT=8080
```

### Run
```
docker-compose up -d
```

### Populate db
```
docker exec -it backend /bin/bash
npm run populate-db
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### TODO
- Add product#photo to project
- Add prettier to frontend
- Improve UI
- Add frontend tests
- Add more tests to backend
- Add typescript to backend
- Improve docker-compose.yml
- Add localizations (fr, en)
- Handle migrations (db)
- precommit hook
- Improve README.md
