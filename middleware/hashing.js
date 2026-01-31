const bcrypt = require('bcryptjs')

exports.hashing = (value, saltValue) => {
    const result = bcrypt.hash(value,saltValue);
    return result
}

exports.hashValidation = (inputPassword,hashedPassword) => {
    const result = bcrypt.compare(inputPassword,hashedPassword);
    return result;
}