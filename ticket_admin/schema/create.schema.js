const Joi = require("joi")

const createTicketSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().alphanum().min(5).max(10).required(),
    password: Joi.string().alphanum().min(5).max(10).required(),
    email: Joi.string().email()
})

module.exports = async function validate(body){
    try{
        const {name, username, password, email} = body
        const data = {
            name,
            username,
            password,
            email
        }
        const value = await createTicketSchema.validateAsync(data)
        return {
            err: undefined,
            data
        }
    }catch(err) {
        return {
            err,
            data: undefined
        }
    }
}