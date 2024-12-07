import * as Sequelize from 'sequelize'
import sequelize from "../util/databaseFirst";
import biometricuser from '../models/biometricuser';
import templateList from "../models/templatelist";

export async function saveFinger(dataTable: any, jsonToSave: any) {
    let save: any[] = [0, 0, 0];
    switch (process.env.TYPEORM_DATABASE) {
        case "1":
            save[0] = await saveTable(dataTable, 0, jsonToSave);
            break;
        case "2":
            save = await Promise.all([saveTable(dataTable, 0, jsonToSave), saveTable(dataTable, 1, jsonToSave)])
            save[2] = 0
            break;
        case "3":
            save = await Promise.all([saveTable(dataTable, 0, jsonToSave), saveTable(dataTable, 1, jsonToSave), saveTable(dataTable, 2, jsonToSave)])
            break;
        default:
            save = await Promise.all([saveTable(dataTable, 0, jsonToSave), saveTable(dataTable, 1, jsonToSave), saveTable(dataTable, 2, jsonToSave)])
            break;
    }
    return save
};

function saveTable(dataTable: any, indice, jsonToSave: any) {
    return new Promise(async (resolve, reject) => {
        try {
            let totalTemplate : number = jsonToSave.templateList.length;
            let BIOMETRICUSER = {
                user_id: jsonToSave.user_id,
                flag_save: jsonToSave.flag_save,
                game_id: jsonToSave.game_id,
                enabled_position: jsonToSave.enabled_position,
                ticket: jsonToSave.ticket,
                gender: jsonToSave.gender,
                company: jsonToSave.company,
                status_mma: jsonToSave.status_mma,
                isMatch: jsonToSave.isMatch,
                trheshold: jsonToSave.trheshold,
                countMatches: jsonToSave.countMatches,
                templateList:[]
            }
            if (totalTemplate <= 10) {
                if(await isTicketUnique(dataTable,indice, jsonToSave.user_id)){
                    for (var item of jsonToSave.templateList){
                        let TEMPLATELIST_MODEL = {
                            user_id: item.user_id,
                            position: item.position,
                            template: item.template
                        }
                        BIOMETRICUSER.templateList.push(TEMPLATELIST_MODEL)
                    }
                await dataTable[indice].create(BIOMETRICUSER, {include: [{ model: templateList[indice], as: 'templateList'}]})
                console.log("Guardo user's info en BD  " + jsonToSave.user_id)
                resolve(1)
            }else{
                let totalTemplate : number = jsonToSave.templateList.length;
                if (totalTemplate <= 10) {
                    const BIOMETRICUSER ={
                        user_id: jsonToSave.user_id,
                        flag_save: jsonToSave.flag_save,
                        game_id: jsonToSave.game_id,
                        enabled_position: jsonToSave.enabled_position,
                        ticket: jsonToSave.ticket,
                        gender: jsonToSave.gender,
                        company: jsonToSave.company,
                        status_mma: jsonToSave.status_mma,
                        isMatch: jsonToSave.isMatch,
                        trheshold: jsonToSave.trheshold,
                        countMatches: jsonToSave.countMatches
                    }
                    await dataTable[indice].update(BIOMETRICUSER, {where: {user_id: jsonToSave.user_id}})
                    if(await isTicketUnique(templateList,indice, jsonToSave.user_id)){
                        for (var item of jsonToSave.templateList) {
                            const TEMPLATELIST_MODEL = {
                                user_id: item.user_id,
                                position: item.position,
                                template: item.template
                        }
                        await templateList[indice].create(TEMPLATELIST_MODEL)
                        }
                        console.log("Guardo templates en db 2 " + jsonToSave.user_id)
                        resolve(2)
                    }
                    for (var item of jsonToSave.templateList) {
                        const TEMPLATELIST_MODEL = {
                            user_id: item.user_id,
                            position: item.position,
                            template: item.template
                        }
                        await templateList[indice].update(TEMPLATELIST_MODEL, {where: { user_id: jsonToSave.user_id, position: Number(item.position)}})
                        resolve(2)
                        }
                        console.log("Actualizo templates en BD " + jsonToSave.user_id)
                    }
                }
            }           
        }catch (error) {
            resolve(0)
            // console.log(error)
            console.log("Error al guardar BD  " + dataTable.tableName + " " + error)
        }
    })
};

function isTicketUnique (dataTable,indice,user_id) {
    return dataTable[indice].count({ where: { user_id: user_id } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}