const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "pepito",
    port: 5432,
    password: "Rsy7123",
    database: "sprint9",
  },
});

module.exports = knex;
