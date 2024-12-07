import { FastifyRequest, FastifyReply } from 'fastify';
import { saveFinger } from "./saveController";
import { saveFingerimg } from "./saveimagecontroller";
import {findCteInfo} from "./findOneController";
import biometricuser from '../models/biometricuser';
import templatelist from "../models/templatelist";
import informationlist from "../models/informationlist";
import {decryptData} from "./crypto";

export const savefingerprints = async (req: FastifyRequest, res: FastifyReply) => {
    console.log("savefingerprints: [POST] /api/v1/savefingeremps");
    let json: any = req.body;
    if (json.templateList !== undefined) {
        let savedclient = await saveFinger(biometricuser, req.body)
        if (JSON.stringify(savedclient) == "[0,0,0]") {
            console.log("could not save users data ")
            let jsonout = {status: 200, message: "no data saved"}
            return res.status(200).send(jsonout).header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains').header('Content-Security-Policy', 'connect-src self');
        }
        if (JSON.stringify(savedclient) == "[2,2,2]") {
            let jsonout = {status: 201, message: "updated"}
            return res.status(201).send(jsonout).header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains').header('Content-Security-Policy', 'connect-src self');
        }
    }
    if (json.imagelist !== undefined){
        let savedclient = await saveFingerimg(biometricuser, req.body)
        if (JSON.stringify(savedclient) == "[0,0,0]") {
            console.log("could not save users data ")
            let jsonout = {status: 200, message: "no data saved"}
            return res.status(200).send(jsonout).header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains').header('Content-Security-Policy', 'connect-src self');
        }
        if (JSON.stringify(savedclient) == "[2,2,2]") {
            let jsonout = {status: 201, message: "updated"}
            return res.status(201).send(jsonout).header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains').header('Content-Security-Policy', 'connect-src self');
        }
    }
    let jsonout = {status: 200, message: "saved"} 
    return res.status(200).send(jsonout).header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains').header('Content-Security-Policy', 'connect-src self');
}

export const findclientinfo = async (req, res) => {
    console.log("findclientinfo: [GET] api/v1/findby/:user_id"); 
    try{
        let findclient = await findCteInfo({user_id: req.params.user_id}, biometricuser, templatelist,informationlist)
        let response = JSON.parse(JSON.stringify(findclient))
        if (response == 0) {
            console.log("no user's info found: "+req.params.user_id)
            return res.status(204).send().header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains').header('Content-Security-Policy', 'connect-src self');
        }
        console.log("user's info found: ",req.params.user_id)
        return res.status(200).send(response).header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains').header('Content-Security-Policy', 'connect-src self');
    }catch (error){
        console.log("error en encontrar info del usuario ", error)
    }
}