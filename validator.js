const joi =  require('joi');


const payloadValidator = {
    FirstName: joi.string().required().description('FirstName'),
        Lastname: joi.string().required().description('Lastname'),
        Email: joi.string().required().description('Email'),
        Occupation: joi.string().required().description('Occupation'),
        City: joi.string().required().description('City'),

}

let handler = (req, reply) =>{
    let FirstName = "";
    let Lastname = "";
    let Email = "";
    let Occupation = "";
    let City = ""; 
    return "hello this is working fine";
}

const responseCode = {
    status: {
        200: { message: joi.any().default('success') },
        500: { message: joi.any().default('some error occour') }
    }
}

module.exports = {
    payloadValidator,
    handler,
    responseCode
};