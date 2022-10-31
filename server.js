const express = require('express')
const bodyParser = require('body-parser')

const ticketAdminRoute = require("./ticket_admin/router")

const PORT = 8080

const db = require("./db")

const app = express()


async function start(){

    // body parser middleware
    app.use(bodyParser.json())

    dbCollections = await db.init()
    if (dbCollections.err){
        console.log("DB Error")
        return
    }

    ticketAdminColl = dbCollections.getTicketAdminCollection()

    app.use("/ticket-admins", ticketAdminRoute(ticketAdminColl))

    app.listen(PORT, (err) => {
        if (err){
            console.log("Server Starting Err")
            console.log(err)
        }else {
            console.log(`Server is running at ${PORT}`)
        }
    })

}

start()
