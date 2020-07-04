module.exports = {
  "type" : "postgres",
  "host" : "127.0.0.1",
  "port" : 5432,
  "username" : "postgres",
  "password" : "postgres",
  "database" : "cheerMeUp",
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
