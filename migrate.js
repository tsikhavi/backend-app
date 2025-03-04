const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false
  }
);

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
});

(async () => {
  await sequelize.authenticate();
  await umzug.up();
  console.log("Migrations applied.");
  process.exit();
})();
