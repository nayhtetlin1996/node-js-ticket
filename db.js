const { MongoClient } = require('mongodb');

const url = 'mongodb://admin:admin@localhost:27017';
const client = new MongoClient(url);

const DB_NAME = "ticketing"
const TICKET_ADMIN_COLLECTION = "ticket_admin"


async function init(){
    try {
        await client.connect()
        db = client.db(DB_NAME)
        return {
            getTicketAdminCollection: () => {
                return db.collection(TICKET_ADMIN_COLLECTION)
            }
        }
    }catch(err) {
        console.log("DB Err")
        return {
            err
        }
    }
}

module.exports = {
    init: init
}
