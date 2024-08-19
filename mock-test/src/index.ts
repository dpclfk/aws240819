import { config } from "dotenv";
import app from "./app";
import router from "./controllers/todo";

config({ path: path.join(__dirname, ".env") });

import sequelize from "./models";
import path from "path";

app.set("port", process.env.PORT || 3001);

app.use("/api/todo", router);
sequelize.sync();

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "server open");
});
