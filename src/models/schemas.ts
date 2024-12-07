const schemaInformationList = {
    type: "object",
    properties: {
        template: { type: "string" },
        photo: { type: "string" },
        iporigin: { type: "string" },
        validateine: { type: "boolean" },
        suc: { type: "integer" },
        user_id_master: { type: "string" },
        statusdbsu: { type: "string" },
        statusdbss: { type: "string" }
    },
    additionalProperties: false
}

const schemarelationsUser = {
    type: "object",
    properties: {
        key: { type: "string" },
        value: { type: "string" },
        user_id_master: { type: "string" },
        company_relation: { type: "integer" },
        game_id: { type: "integer" },
        statusdbsu: { type: "string" },
        statusdbss: { type: "string" }
    },
    additionalProperties: false
}

const innerArraySchemaInformationList = {
    "type": "array",
    "items": [schemaInformationList]
}

const innerArraySchemarelationsUsers = {
    "type": "array",
    "items": [schemarelationsUser]
}

export const jsonOutSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'integer' },
                message: { type: 'string' }
            }
        },
        500: {
            type: 'object',
            properties: {
                status: { type: 'integer' },
                message: { type: 'string' }
            }
        }
    }
}
export const saveSchema = {
    body: {
        type: 'object',
        properties: {
            user_id: { type: 'string' },
            game_id: { type: 'string' },
            company: { type: 'string' },
            gender: { type: 'string' },
            ticket: { type: 'string' },
            status: { type: 'integer' },
            type: { type: 'integer' },
            sequence: { type: 'integer' },
            statusdbsu: { type: 'integer' },
            statusdbss: { type: 'integer' },
            countmatches: { type: 'integer' },
            situation: { type: 'integer' },
            informationList: innerArraySchemaInformationList,
            relationsUsers: innerArraySchemarelationsUsers

        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'integer' },
                message: { type: 'string' }
            },
        },
        500: {
            type: 'object',
            properties: {
                status: { type: 'integer' },
                message: { type: 'string' }
            }
        }
    }
}

