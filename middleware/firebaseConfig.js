const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const admin = require('firebase-admin');
const ad=require('firebase-admin');

var serviceAccount = require('../exam-portal.json');
var st=require('../student-portal.json');

const app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const auth = getAuth(app);

const studentApp = initializeApp(
    { credential: ad.credential.cert(st) },
    "student-portal"
  );
  const studentAuth = getAuth(studentApp);








module.exports = { app, auth ,studentAuth , studentApp };