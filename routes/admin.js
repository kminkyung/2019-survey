const express = require('express');
const router = express.Router();
const util = require('../modules/util');

/* Router */
router.get(['/', '/:type', '/:type/:id'], adminRouter);
router.post('/survey', createSurvey);

/* Global */
let loginUser = {};

function adminRouter(req, res, next) {
  let type = req.params.type;
  let id = req.params.id;
  loginUser = req.session.admin;
  const title = 'IGAworks 설문조사 관리자 메뉴';
  const paginationList = '설문지 목록';
  const adminVal = {title, paginationList, loginUser};
  if(!util.nullchk(type)) type = "li";
  if(type == "li" && !util.nullchk(id)) id = 1;
  switch(type) {
    case "li":
      res.render('admin/main', adminVal);
      break;

    case "in":
      adminVal.paginationAdd = '설문지 추가';
      res.render('admin/survey-in', adminVal);
      break;
    case "update":
      break;
    case "delete":
      break;
  }
};

function createSurvey(req, res, next) {

};

module.exports = router;
