/* app  */
const express = require('express');
const app = express();
const router = express.Router();

/* node_modules */
const path = require('path');
/* const session = require('express-session');
const store = require("session-file-store")(session); */
const { AdminLogin } = require('../model/AdminLogin');
const util = require('../modules/util')
const db = require('../modules/mysql-conn');
const sqlExec = db.sqlExec;

/* global */



/* app init */
/* app.use(session({
  secret: salt,
	resave: false, 
	saveUninitialized: true,
	store: new store()
}));   */


/* Router */
router.get('/', loginPage);
router.get('/logout', trylogout)
router.post('/', tryLogin);


/* GET home page. */
function loginPage(req, res, next) {
  const title = 'IGAworks 설문조사 플랫폼 어드민 로그인';
  res.render('login', {title});
};


function tryLogin(req, res, next) {
  let adminid = req.body.loginid;
  let adminpw = req.body.loginpw;
  let result;
  let sql = '';
  let sqlvals = [];
  (async () => {
    sql = 'SELECT * FROM surveyadmin WHERE adminID=? AND adminPW=?';
    sqlvals.push(adminid);
    sqlvals.push(adminpw);
    result = await sqlExec(sql, sqlvals);
    if(result[0].length == 1) {
      req.session.admin = {};
      req.session.admin.id = result[0][0].adminID;
      req.session.admin.grade = result[0][0].grade;
      // console.log(req.session);
      res.redirect("/admin");
      // res.render('admin/main.pug', loginValue);
      // res.json({code: 200});
    }
    else {
      req.session.destroy();
      res.send(util.alertAdmin());
    }
  })();
}

/* Sequelize 구문 */
/* async function tryLogin(req, res, next) {
  let result = await AdminLogin.findAll({
    where : {
      adminID : req.body.loginid,
      adminPW : req.body.loginpw
    }
  });
  if(result.length == 1) res.render('admin/main.pug');
} */

function trylogout(req, res, next) {
  req.session.destroy();
  res.redirect("/");
}


module.exports = router;
