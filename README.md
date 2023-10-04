<div align='center'>

<img src="https://i.imgur.com/sIEPRwL.png" alt="logo" />

<h1>Echo</h1>
<p>Chat application built with microservices architecture and frontend caching.</p>

<h4> <span> · </span> <a href="https://github.com/ibrahimhabibeg/Echo/blob/main/README.md"> Documentation </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/Echo/issues"> Report Bug </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/Echo/issues"> Request Feature </a> </h4>


</div>

# 📙 Table of Contents

- [About the Project](#⭐-about-the-project)
- [Tech Stack](#🧑‍💻-tech-stack)
- [Folder Structure](#📁-folder-structure)
- [Local Installation](#🧰-local-installation)
- [Contact](#🤝-contact)
- [Acknowledgements](#💎-acknowledgements)


## ⭐ About the Project

Echo is a chat system that is built using modern technologies including docker, react native, node, typescript, express, mongo, and websocket.

## 🧑‍💻 Tech Stack

**Client:** React Native, Expo, React Query, React Native Paper, Socket.io, Typescript

**Server:** Docker, Node, Typescript, Mongo, mongoose, Express, Socket.io, jsonwebtoken

## 📁 Folder Structure
```
Echo
| README.md
|
|─── backend
|   | compose.yaml
|   | compose.dev.yaml
|   | message
|   | mongo
|   | user
|
|─── mobile
|   |  ...
```

- backend/compose.yaml contains the data docker needs to run the backend services in production environment

- backend/compose.dev.yaml contains the rules used by docker run the backend in development environment. These rules override backend/compose.yaml rules.

- backend/message contains the source code for the service used for managing messages.

- backend/mongo contains the service responsible for the mongo database.

- backend/user contains the source code for the service used for users authentication, creation, and adminstration.

- mobile contains the source code for the mobile app built with React Native.

## 🧰 Local Installation

### ⚠️ Prerequisites

- Install Docker in your computer<a href="https://docs.docker.com/get-docker/"> Here</a>

- Install Node JS in your computer for the mobile app<a href="https://nodejs.org/en"> Here</a>

- This mobile app uses Yarn as package manager
```bash
npm i -g yarn
```
- We will use docker to run the backend without installing the packages.

- Installing packages in the backend will only be used for IDE autocompletion.

### 🏃‍♂️ Run Locally

Clone the project

```bash
git clone https://github.com/ibrahimhabibeg/Echo
```
Go to the project directory
```bash
cd Echo
```
Create environment variables files for mobile
```bash
touch mobile/.env mongo/.env user/.env message/.env
```
Add backend services url to mobile/.env file
```
EXPO_PUBLIC_USER_SERVICE_URL=http://MY_LOCAL_IP:3000
EXPO_PUBLIC_MESSAGE_SERVICE_URL=http://MY_LOCAL_IP:3001
EXPO_PUBLIC_MESSAGE_WEBSOCKET_URL=ws://MY_LOCAL_IP:3002
```
Add mongo initial data to mongo/.env file
```
MONGO_INITDB_ROOT_USERNAME=ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD=ROOT_PASSWORD
MONGO_INITDB_DATABASE=chat
MONGO_INITDB_USER=USER_USERNAME
MONGO_INITDB_PWD=USER_PASSWORD
```
Add db user data to both user/.env and message/.env files
```
DB_USER=USER_USERNAME
DB_PASS=USER_PASSWORD
```

Add JWT and Bcrypt data to user/.env file
```
...
SALT_ROUNDS=10
JWT_SECRET=MY_JWT_SECRET
```
Start the backend in production mode
```bash
cd backend
docker compose up --build
```

Start the backend in development mode
```bash
cd backend
docker compose -f compose.yaml -f compose.dev.yaml up --build
```
Start the mobile app
```bash
cd mobile
yarn start
```

## 🤝 Contact

Ibrahim Habib - - ibrahimhabib.eg@gmail.com  - - [LinkedIn](https://www.linkedin.com/in/ibrahim-habib-a2948b286/)

Project Link: [Github](https://github.com/ibrahimhabibeg/Echo)

## 💎 Acknowledgements

- https://hotpot.ai/  for Images and Splash Screen Creation