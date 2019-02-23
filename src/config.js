
let connectionString = '';
let ENVIRONMENT;

switch(process.env.NODE_ENV){
    case 'test': 
        connectionString = process.env.CONNECTION_STRING_TEST;
        ENVIRONMENT = 'TEST';
        break;
    // case 'DEVELOPMENT': break;
    default: 
        connectionString = process.env.CONNECTION_STRING_PROD;
        ENVIRONMENT = 'PRODUCTION';
        break;
}


module.exports = {
    SALT_KEY: process.env.SALT_KEY,
    ENVIRONMENT,
    connectionString,
    SENDGRID_KEY: process.env.SENDGRID_KEY
}