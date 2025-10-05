const admin = require('firebase-admin');
const serviceAccount = require('../waste-exchange-a94b0-firebase-adminsdk-fbsvc-78589f483e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };