import * as Sequelize from 'sequelize'

export async function updatestatusController(dataTable: any, jsonToSave: any) {
    let save: any[] = [0, 0, 0];
    switch (process.env.TYPEORM_DATABASE) {
        case "1":
            save[0] = await updateStatus(dataTable, jsonToSave, 0);
            break;
        case "2":
            save = await Promise.all([updateStatus(dataTable, jsonToSave, 0), updateStatus(dataTable, jsonToSave, 1)])
            save[2] = 0
            break;
        default:
            save = await Promise.all([updateStatus(dataTable, jsonToSave, 0), updateStatus(dataTable, jsonToSave, 1)])
            break;
    }
    return save
};

function updateStatus(dataTable: Sequelize.ModelCtor<Sequelize.Model<any, any>>, jsonToSave: any, transaction: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const TICKETS = {marcado_cartera:jsonToSave.status}
            
            await dataTable[transaction].update(TICKETS,{where: { ticket: jsonToSave.ticket, user_id: jsonToSave.user_id}});
            console.log("data updated succesfully")
            resolve(1)
        } catch (error) {
            console.log(error)
            resolve(0)
            console.log("error while trying to update "+error)
        }
    })
};
