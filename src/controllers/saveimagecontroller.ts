import imageList from "../models/imagelist";


export async function saveFingerimg(dataTable: any, jsonToSave: any) {
    let save: any[] = [0, 0, 0];
    switch (process.env.TYPEORM_DATABASE) {
        case "1":
            save[0] = await saveTableimg(dataTable, 0, jsonToSave);
            break;
        case "2":
            console.log("2")
            save = await Promise.all([saveTableimg(dataTable, 0, jsonToSave), saveTableimg(dataTable, 1, jsonToSave)])
            save[2] = 0
            break;
        case "3":
            save = await Promise.all([saveTableimg(dataTable, 0, jsonToSave), saveTableimg(dataTable, 1, jsonToSave), saveTableimg(dataTable, 2, jsonToSave)])
            break;
        default:
            console.log("default")
            save = await Promise.all([saveTableimg(dataTable, 0, jsonToSave), saveTableimg(dataTable, 1, jsonToSave), saveTableimg(dataTable, 2, jsonToSave)])
            break;
    }
    return save
};

function saveTableimg(dataTable: any, indice, jsonToSave: any) {
    return new Promise(async (resolve, reject) => {
        try {
            let totalImage : number = jsonToSave.imagelist.length;
            //let totalImage: number = jsonToSave.imagelist == undefined ? 0 : jsonToSave.imagelist.length;
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
                imagelist:[]
            }
            if (totalImage <= 10) {
                console.log("a")
                if(await isTicketUnique(dataTable,indice, jsonToSave.user_id)){
                    for (var item of jsonToSave.imagelist){
                        //console.log("template cifrado "+encryptedData)
                        let IMAGELIST_MODEL = {
                            user_id: item.user_id,
                            position: item.position,
                            image: item.image,
                            sequence:item.sequence
                        }
                        BIOMETRICUSER.imagelist.push(IMAGELIST_MODEL)
                    }
                await dataTable[indice].create(BIOMETRICUSER, {include: [{ model: imageList[indice], as: 'imagelist'}]})
                console.log("Guardo user's info en BD  " + jsonToSave.user_id)
                resolve(1)
                }else{
                    let totalImage : number = jsonToSave.templateList.length;
                    if (totalImage <= 10) {
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
                        if(await isTicketUnique(imageList,indice,jsonToSave.user_id)){
                            for (var item of jsonToSave.imagelist) {
                                const IMAGELIST_MODEL = {
                                    user_id: item.user_id,
                                    position: item.position,
                                    image: item.image
                            }
                            await imageList[indice].create(IMAGELIST_MODEL)
                            resolve(2)
                            }
                            console.log("Guardo imagen en BD " + jsonToSave.user_id)
                        }
                        for (var item of jsonToSave.imagelist) {
                            const IMAGELIST_MODEL = {
                                user_id: item.user_id,
                                position: item.position,
                                image: item.image
                            }
                            await imageList[indice].update(IMAGELIST_MODEL, {where: { user_id: jsonToSave.user_id, position: Number(item.position)}})
                            resolve(2)
                        }
                        console.log("Actualizo imagen en BD " + jsonToSave.user_id)
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