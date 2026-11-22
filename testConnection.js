import sequelize from "./config/db.js";

try {
  await sequelize.authenticate();

  console.log("Connection to MySQL has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
} finally {
  await sequelize.close();
}
