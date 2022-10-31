const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(plainPassword) {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
        return {
            password: hashedPassword,
            err: undefined
        }
    }catch(err) {
        return {
            password: undefined,
            err
        }
    }
}

module.exports = {
    hashPassword
}