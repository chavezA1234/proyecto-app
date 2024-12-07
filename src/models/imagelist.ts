import * as Sequelize from 'sequelize'
import sequelize from "../util/databaseFirst";

let schema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique:true
    },
    user_id: {
        type: Sequelize.STRING,
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}
const imageList = sequelize.define('imagelistemps', schema,
    {
        freezeTableName: true,
        timestamps: true
    });
export default [imageList]