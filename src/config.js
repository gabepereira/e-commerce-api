global.SALT_KEY = '3368f0eb1f24cc0228b4938f965e7e17';
global.EMAIL_TMPL = '<strong>{0}</strong>';

const user = 'mrdoge';
const pass = 'doge666';
const db = 'mongodb+srv://' + user + ':' + pass + '@cluster0-f0whx.azure.mongodb.net/test?retryWrites=true';

module.exports = {
    connectionString: db,
    sendgridKey: 'TBD',
    containerConnectionString: 'TBD'
}