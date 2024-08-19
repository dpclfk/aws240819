import Todo from "./Todo";
import sequelize from "./database";

sequelize.addModels([Todo]);
export default sequelize;
