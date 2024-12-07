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
    tiposensor: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    fabricante: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false,
    },
    modelo: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false,
    },
    serie: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false,
    },
    firmware: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false,
    }
}

const informationlistemps1 = sequelize.define('informationlistemps', schema,
    {
        freezeTableName: true,
        timestamps: true
    });

export default [informationlistemps1]
