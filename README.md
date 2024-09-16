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

### Run
```
docker-compose up -d
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
