import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tour_Category = sequelize.define(
  "Tour",
  {
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "tours", // Tên bảng mà khóa ngoại tham chiếu đến
        key: "id", // Tên trường trong bảng mà khóa ngoại tham chiếu đến
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "categories", // Tên bảng mà khóa ngoại tham chiếu đến
        key: "id", // Tên trường trong bảng mà khóa ngoại tham chiếu đến
      },
    },
  },
  { tableName: "tours_categories", timestamps: false },
);

export default Tour_Category;
