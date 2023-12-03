# Hackathon KZC app
This is the app we build on first KZC Hackathon
## How to run?
### Frontend
You need to install latest node.js version, then go to the *front* catalog.
In this catalog you have to run `npm install`.
When it is done, you have to run `npm run dev` to start frontend dev server.
### Backend
You have to install at least python 3.11, then use pip to install required modules.
```
pip install uvicorn
pip install fastapi
pip install openai
pip install python-dotenv
```
Then go to the *back* catalog, create `.env` file and add
`OPENAI_KEY=<Your_OpenAI_key>`.
After that you can run `uvicorn request_handling:app --reload` to start backend server

## Build
If you want to build frontend you need to run backend server first, then go to the *front* catalog and run
```
npm run build
```
After building you can run
```
npm run start
```
to start frontend server