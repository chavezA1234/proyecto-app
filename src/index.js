import * as fastify from 'fastify';
import sequelize from "./util/databaseFirst";
import routes from './routes/users';
const dotenv = require('dotenv');
dotenv.config();
require('dotenv').config()

//INITIALIZE APP WITH FASTIFY
const app = fastify.default({ logger: false, bodyLimit: 1024 * 1024 * 1024 });
routes.forEach(route => {
  app.route(route);
});

(async () => {
  try {
    await sequelize.sync(
      { force: false } //Reset db every time   
    );   
    let ip ="127.0.0.1"
    let port ="20045"
    app.listen({
      port: port,
      host: ip
    });
    console.info('app is running on ' + ip + ': ' + port)
  } catch (error) {
    console.log(error);
  }
})();