const { ObjectId } = require("mongodb")

function updateById(ticketAdminCollection) {
    return async (ticketAdminId, ticketAdminData) => {
        const {name, password, email} = ticketAdminData
        const updateQuery  = {
            $set: {
                name: name,
                password: password,
                email: email
            }
        }
        try{
            const updateResult = await ticketAdminCollection.updateOne({"_id": ObjectId(ticketAdminId)}, updateQuery)
            return {
                data: updateResult,
                err: undefined
            }
        }catch(err) {
            return {
                data: undefined,
                err
            }
        }
    }
}

function findAll(ticketAdminCollection) {
    return async () => {
        try{
            const result = await ticketAdminCollection.find({}, {'projection': {"password": 0}}).toArray()
            return {
                data: result,
                err: undefined
            }
        }catch(err) {
            return {
                data: undefined,
                err
            }
        }
    }
} 

function doesUsernameExist(ticketAdminCollection) {
    return async (username) => {
        try {
            const existingUser = await ticketAdminCollection.findOne({username: username}, {'projection': { "_id": 1 }})
            const isUserExist = existingUser ? true : false
            return {
                data: isUserExist,
                err: undefined
            }
        }catch(err) {
            return {
                data: undefined,
                err
            }
        }
    }
}

function save(ticketAdminCollection){
    return async (ticketAdminData) => {
        try {
            await ticketAdminCollection.insertOne(ticketAdminData)
            return {
                data: ticketAdminData,
                err: undefined
            }
        }catch(err) {
            return {
                data: undefined,
                err
            }
        }
    }
}

function init(ticketAdminCollection){
    return {
        updateById: updateById(ticketAdminCollection),
        findAll: findAll(ticketAdminCollection),
        doesUsernameExist: doesUsernameExist(ticketAdminCollection),
        save: save(ticketAdminCollection)
    }
}

module.exports = init