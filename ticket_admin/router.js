const express = require("express")

const service = require("./service")
const createSchemaValidate = require("./schema/create.schema")
const updateSchemaValidate = require("./schema/update.schema")
const repo = require("./repo")

async function createSchemaValidationMiddleware(req, res, next){
    const {data, err} = await createSchemaValidate(req.body) 
    if (err) {
        res.status(400)
        const errMsg = err.details[0].message
        return res.json({
            errorMessage: errMsg
        })
    }
    req.data = data
    next()
}

async function updateSchemaValidationMiddleware(req, res, next){
    if (!req.params.id){
       res.status(400)
       return res.json({
            errorMessage: "Id is required"
       })
    }
    const {data, err} = await updateSchemaValidate(req.body) 
    if (err) {
        res.status(400)
        const errMsg = err.details[0].message
        return res.json({
            errorMessage: errMsg
        })
    }
    req.id = req.params.id
    req.data = data
    next()
}

router = express.Router()

function init(ticketAdminColl){

    const ticketAdminRepo = repo(ticketAdminColl)

    router.get(
        "/", 
        service.getTicketAdmins(ticketAdminRepo)
    )
    
    // ticket admin post api
    router.post(
        "/",
        createSchemaValidationMiddleware,
        service.createTicketAdmin(ticketAdminRepo)
    )

    // ticket admin put api
    router.put(
        "/:id",
        updateSchemaValidationMiddleware,
        service.updateTicketAdmin(ticketAdminRepo)
    )

    return router
}


module.exports = init