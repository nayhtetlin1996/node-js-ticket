const Joi = require("joi")

const updateTicketSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().alphanum().min(5).max(10).required(),
    email: Joi.string().email()
})

module.exports = async function validate(body){
    try{
        const {name, password, email} = body
        const data = {
            name,
            password,
            email
        }
        const value = await updateTicketSchema.validateAsync(data)
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