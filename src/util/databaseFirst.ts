const { Sequelize } = require('sequelize-yugabytedb');
require('dotenv').config()

const fs = require('fs');
const path = require('path');

let Database : string; let Username : string; let Password : string; let Host : string; let sslConfig: any;let Port : any;

const rootCertPath = path.resolve(__dirname, 'root.crt');

if (Boolean(Number(process.env["FINGER_DB_OP_SSL"] ?? false))) {
  sslConfig = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: fs.readFileSync(rootCertPath).toString()
    }
  }
} else {
  sslConfig = {};
}

Database = String(process.env.FINGER_DB_OP_NAME)
Username = String(process.env.FINGER_DB_OP_USER)
Password = String(process.env.FINGER_DB_OP_PSWD)
Host     = String(process.env.FINGER_DB_OP_IP)
Port     = Number(process.env.FINGER_DB_OP_PORT)

export const sequelize = new Sequelize(
  Database,
  Username,
  Password,
  {
    host: Host,
    port: Port,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000,
      charset: 'utf8'
    },
    dialectOptions: sslConfig
  }
);
export default sequelize
