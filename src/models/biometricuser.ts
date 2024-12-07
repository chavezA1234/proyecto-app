import * as Sequelize from 'sequelize'
import sequelize from "../util/databaseFirst";
import templatelist from "../models/templatelist";
import informationlist from "../models/informationlist";
import imageList from "../models/imagelist";
let schema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
	unique:true
    },
    user_id: {
        type: Sequelize.STRING,
	primaryKey: true,
        allowNull: false,	
    },
    game_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mirror_mty: {
        type: Sequelize.STRING,
        defaultValue: "0",
        allowNull: false,
    },
    situation_mma: {
        type: Sequelize.STRING,
        defaultValue: "9",
        allowNull: false,
    },
    enabled_position: {
        type: Sequelize.STRING,
        defaultValue: "1",
        allowNull: false
    },
    ticket: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    company: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status_mma: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isMatch: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    trheshold: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    countMatches: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    replica: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
}

const biometricuseremps1 = sequelize.define('biometricuseremps', schema,
    {
        freezeTableName: true,
        timestamps: true
    });

biometricuseremps1.hasMany(templatelist[0], {
    foreignKey: 'user_id', as: 'templateList'
});
biometricuseremps1.hasMany(informationlist[0], {
    foreignKey: 'user_id', as: 'informationlist'
});

biometricuseremps1.hasMany(imageList[0], {
    foreignKey: 'user_id', as: 'imagelist'
});


export default [biometricuseremps1]
