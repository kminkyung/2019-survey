const {sequelize, Sequelize} = require("../modules/sequelize-conn");

/* Model 작성 */
const Model = Sequelize.Model;
class AdminLogin extends Model {}
// Sample.init({테이블정보}, {옵션});
AdminLogin.init({
	adminID: {
		type: Sequelize.STRING, 
		allowNull: false
	},
	adminPW: {
		type: Sequelize.STRING,
		allowNull: false
	},
	grade: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 1
	},
 }, {
		sequelize,
		modelName: "surveyadmins"
});

// async() method를 최초 한번 실행하여 테이블이 생성되면 주석처리하여 더 이상 쓸 필요가 없다.
(async () => {
	const result = await AdminLogin.sync({force: true});
	AdminLogin.create({
		adminID: "admin",
		adminPW: "0000",
		grade: 1
	})
});

module.exports = {AdminLogin};