const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI//Tùy chọn 1: Chuyển URI kết nối
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)//Tùy chọn 2: Chuyển các tham số riêng biệt (sqlite)
//const sequelize = new Sequelize({
 // dialect: 'sqlite',
 // storage: 'path/to/database.sqlite'
//});

// Option 3: Passing parameters separately (other dialects)//Cách 3: Chuyển tham số riêng biệt (các phương ngữ khác)
const sequelize = new Sequelize('dacn', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () =>{
    try {
       await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports = connectDB;