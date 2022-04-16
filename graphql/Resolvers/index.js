const productResolver = require('./productResolvers');
const userResolver = require('./userResolvers');
module.exports = {
    ...productResolver,
    ...userResolver
};