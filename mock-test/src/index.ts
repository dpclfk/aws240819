import { config } from "dotenv";
import app from "./app";
import router from "./controllers/todo";
import path from "path";

config({ path: path.join(__dirname, ".env") });
// config();

import sequelize from "./models";

app.set("port", process.env.PORT || 3001);

app.use("/api/todo", router);
sequelize.sync();

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "server open");
});
