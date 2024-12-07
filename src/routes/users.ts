import * as ControllerEncode from '../controllers/usersEncodeSave'
//import * as schemas from '../models/schemas'
import { RouteOptions } from "fastify";
 
const Savefinger: RouteOptions = {
	method: 'POST',
	url: '/api/v1/saveempstempimg/saveempsti',
	//schema: schemas.saveSchema,
	handler: ControllerEncode.savefingerprints,
};

const findoneby: RouteOptions = {
	method: 'GET',
	url: '/api/v1/getempstempimg/findempsti/:user_id',
	//schema: schemas.saveSchema,
	handler: ControllerEncode.findclientinfo,
};

const routes =[
	Savefinger,
	findoneby
]

export default routes;