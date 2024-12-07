import * as Sequelize from 'sequelize'
import {decryptData }from "../controllers/crypto"
import imageList from "../models/imagelist";


export async function findclient(dataTable: Sequelize.ModelCtor<Sequelize.Model<any, any>>,templatelist:  Sequelize.ModelCtor<Sequelize.Model<any, any>>, imageList:  Sequelize.ModelCtor<Sequelize.Model<any, any>>,informationlist: Sequelize.ModelCtor<Sequelize.Model<any, any>>, conditional: any) 
{
    try {
        let userinfo: any;
        userinfo = await dataTable.findOne({
            where: conditional,
            include: [{ model: templatelist, as: "templateList"},{ model: imageList, as: "imagelist" },{ model: informationlist, as: "informationlist" }]
        })
        if (userinfo == null || userinfo == 0){
            return 0
        }
        return userinfo
    }catch (error) {
        console.log("error finding user info ",error)
        return 0
    }
};

export async function findCteInfo(conditional: any, biometricsuser: any, templatelist: any, informationlist: any) {
    // Realizar con un for la consulta a las base de datos
    try{
        let result = await findclient(biometricsuser[0],templatelist[0], imageList[0], informationlist[0], conditional)
        if (result != 0) {
            return result
        }
        return 0
    }catch (error){
        console.log("error finding user info", error)
        return 0
    }
}
