global.SALT_KEY = 'ZMKe7c4BuYk1Cpe41PIJ4RCR4H0lQ8tA'; // Generate a key and paste it in this global variable.

// MongoDB Credentials.
const user = 'username';
const pass = 'password';

// MongoDB Atlas connection link.
// You can change to your local db link too.
const db = 'mongodb+srv://' + user + ':' + pass + '@cluster0-f0whx.azure.mongodb.net/test?retryWrites=true';

module.exports = {
    connectionString: db
}