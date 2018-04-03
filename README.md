## PING PONG API REST 

This is a service to manage and tracker ping pong matches

### Dependencies
- Node.js v8.9.4
- PostgresQL v9.6.*

### Setup
- `$ npm i -g @adonisjs/cli`
- `$ npm i`
- `$ cp .env.example .env` - fill all the environment variables
- `$ adonis key:generate`

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Seed 
If you have a few data to start run de following command.
```js
adonis seed
```

### Start project
```js
adonis serve --dev
```
