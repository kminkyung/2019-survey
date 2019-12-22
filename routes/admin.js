const express = require('express');
const router = express.Router();
const util = require('../modules/util');

/* GET admin page */
router.get(['/', '/:type', '/:type/:id'], adminRouter);

/* global */
let loginUser = {};

function adminRouter(req, res, next) {
  let type = req.params.type;
  let id = req.params.id;
  loginUser = req.session.admin;
  const title = 'IGAworks 설문조사 관리자 메뉴';
  const pagination = '설문지 목록';
  const adminid = {title, pagination, loginUser};
  if(!util.nullchk(type)) type = "li";
  if(type == "li" && !util.nullchk(id)) id = 1;
  switch(type) {
    case "li":
      res.render('admin/main', adminid);
      break;

    case "in":

      break;
    case "update":
      break;
    case "delete":
      break;
  }
};

module.exports = router;
