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
	allowNull: false,
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    template: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}

const templatelistemps1 = sequelize.define('templatelistemps', schema,
    {
        freezeTableName: true,
        timestamps: true
    });

export default [templatelistemps1]
