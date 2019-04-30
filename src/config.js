global.SALT_KEY = 'Put your own key here.';
global.EMAIL_TMPL = '<strong>{0}</strong>';

const user = 'user';
const pass = 'pass';
const db = 'mongodb+srv://' + user + ':' + pass + '@cluster0-f0whx.azure.mongodb.net/test?retryWrites=true';

module.exports = {
    connectionString: db,
    sendgridKey: 'TBD',
    containerConnectionString: 'TBD'
}