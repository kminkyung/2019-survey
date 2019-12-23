/* app  */
const express = require('express');
const app = express();
const router = express.Router();

/* node_modules */
const path = require('path');
const { AdminLogin } = require('../model/AdminLogin');
const util = require('../modules/util')
const db = require('../modules/mysql-conn');
const sqlExec = db.sqlExec;

/* global */

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
  let obj = {};
  (async () => {
    sql = 'SELECT * FROM surveyadmins WHERE adminID=? AND adminPW=?';
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
      obj.msg = '아이디 또는 패스워드가 일치하지 않습니다.'
      obj.loc = '/';
      res.send(util.alertLocation(obj));
    }
  })();
}

/* Sequelize 구문 */
/* async function tryLogin(req, res, next) {
  let obj = {};
  let result = await AdminLogin.findAll({
    where : {
      adminID : req.body.loginid,
      adminPW : req.body.loginpw,
      grade : 1
    }
  });
  console.log(AdminLogin);
  if(result[0].length == 1) {
    req.session.admin = {};
    req.session.admin.id = result[0][0].adminID;
    req.session.admin.grade = result[0][0].grade;
    res.redirect('/admin');
  }
  else {
    req.session.destroy();
    obj.msg = '아이디 또는 패스워드가 일치하지 않습니다.'
    obj.loc = '/';
    res.send(util.alertLocation(obj));
  }
} */

function trylogout(req, res, next) {
  req.session.destroy();
  res.redirect("/");
}


module.exports = router;
