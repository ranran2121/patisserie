## Getting Started

1.Cd in the project folder and make sure to have the env variables in the .env file

2.Set the node version:

```bash
nvm use
```

3.Install dependencies:

```bash
npm install
```

4.Start the database container:

```bash
npm run docker-up
```

5.After the database container is started and running:

```bash
npm run db-up
```

6.Start the application:

```bash
npm run dev
```
