
let connectionString = '';
let ENVIRONMENT;

switch(process.env.NODE_ENV){
    case 'test': 
        connectionString = 'mongodb://<user>:<password>@host:port/<your-database>-test'
        ENVIRONMENT = 'TEST';
        break;
    // case 'DEVELOPMENT':
    default: 
        connectionString = 'mongodb://<user>:<password>@host:port/<your-database>';
        ENVIRONMENT = 'DEVELOPMENT';
        break;
}


module.exports = {
    SALT_KEY: 'YOUR_SALT_KEY',
    ENVIRONMENT,
    connectionString,
    SENDGRID_KEY: 'YOUR_SENDGRID_KEY'
}