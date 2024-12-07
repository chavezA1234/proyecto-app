import * as Sequelize from 'sequelize'

export async function findTable(dataTable: Sequelize.ModelCtor<Sequelize.Model<any, any>>,Informationlist:  Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        RelationsUsers:  Sequelize.ModelCtor<Sequelize.Model<any, any>> , conditional: any) {
    try {
        let user = await dataTable.findOne({
            where: conditional,
            include: [{ model: Informationlist }, { model: RelationsUsers }]
        })
        if (user == null) {
            return 0
        }
        return user
    } catch (error) {
        console.log(error)
        return 0
    }
};

async function findOne(conditional: any, dataTable: any, Informationlist: any, RelationsUsers: any) {
    let result = await Promise.all([findTable(dataTable[0],Informationlist[0], RelationsUsers[0], conditional), 
        findTable(dataTable[1],Informationlist[1], RelationsUsers[1], conditional), findTable(dataTable[2],Informationlist[2], RelationsUsers[2], conditional)])
    for (let element of result) {
        if (element != 0) {
            return element
        }
    }
    return 0
}

export default findOne;
