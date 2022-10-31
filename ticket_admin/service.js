const bcryptUtil = require("../common/bcrypt-util")

function getTicketAdmins(repo){

    return async function (req, res) {
        try {
            const {data, err} = await repo.findAll()
            return res.json({
                data
            })
        }catch (err) {
            console.log(err)
            res.status(500)
            res.json({
                errorMessage: "Internal Server Error"
            })
        }
    }
}

function createTicketAdmin(repo){
    return async function (req, res) {
        const {data} = req
        const {data: isUserExist, err: isUserExistErr} = await repo.doesUsernameExist(data.username)
        if (isUserExistErr) {
            res.status(500)
            return res.json({
                errorMessage: "Internal Server Error"
            })
        }
        if(isUserExist) {
            res.status(400)
            return res.json({
                errorMessage: "Username is already used"
            })
        }
        const {password, err} = await bcryptUtil.hashPassword(data.password)
        if (err){
            console.log(err)
            res.status(500)
            return res.json({
                errorMessage: "Internal Server Error"
            })
        }
        data.password = password
        const {data: ticketAdminData, err: ticketAdminSaveErr} = await repo.save(data)
        if (ticketAdminSaveErr) {
            res.status(500)
            return res.json({
                errorMessage: "Internal Server Error"
            })
        }
        res.status(201)
        delete ticketAdminData.password
        return res.json(ticketAdminData)
    }
}

function updateTicketAdmin(repo) {
    return async (req, res) => {
        const {data} = req
        const {password, err} = await bcryptUtil.hashPassword(data.password)
        if (err){
            console.log(err)
            res.status(500)
            return res.json({
                errorMessage: "Internal Server Error"
            })
        }
        data.password = password
        const {data: updateResult, err: updateErr} = await repo.updateById(req.id, data)
        if (updateErr) {
            res.status(500)
            return res.json({
                errorMessage: "Internal Server Error"
            })
        }
        console.log(updateResult)
        res.status(204)
        delete data.password
        return res.json(data)
    }
}

module.exports = {
    getTicketAdmins,
    createTicketAdmin,
    updateTicketAdmin
}