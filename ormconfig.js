module.exports = {
  "type" : "postgres",
  "host" : "",
  "port" : 5432,
  "username" : "",
  "password" : "",
  "database" : "",
  "extra": {
    "ssl": true
    },
  "entities": [
    "./src/models/*.ts"
  ],
  "migrations" : [
    "./src/database/migrations/*.ts"
  ],
  "cli":{
    "migrationsDir" : "./src/database/migrations"
}
}
