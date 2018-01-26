const mysql = require('mysql');
let con = mysql.createConnection({
  host: "localhost",
  user: "menuSystem",
  password: "menuSystem"

});


//initialize mysql DB if not exist
let sql = "CREATE DATABASE IF NOT EXISTS MyMenu";
con.query(sql, function (err, result, fields) {
  if (err) {
    console.log(sql);
    console.log("failed to confirm DB - MyMenu");
    throw err;
  }

  createTables();
});

con = mysql.createConnection({
  host: "localhost",
  user: "menuSystem",
  password: "menuSystem",
  database: "MyMenu"

});

function createTables() {

  let sql = [

    `CREATE TABLE IF NOT EXISTS Menu_Items (
      item_id smallint(4) NOT NULL AUTO_INCREMENT,
      rest_id bigint(10) NOT NULL,
      seq smallint(4) NOT NULL,
      title varchar(45) DEFAULT 'new title',
      descr varchar(255) DEFAULT 'New Item Description',
      price decimal(7,2) DEFAULT '10.00',
      PRIMARY KEY (item_id,rest_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
    ,
    "CREATE TABLE IF NOT EXISTS `Users` (" +
    "`id` int(12) NOT NULL AUTO_INCREMENT," +
    "`email` varchar(255) NOT NULL," +
    "`password` varchar(45) NOT NULL," +
    "`rest_name` varchar(45) DEFAULT 'New Resturant Name'," +
    "PRIMARY KEY (`id`,`email`)," +
    "UNIQUE KEY `email_UNIQUE` (`email`)" +
    ");"

  ];

  let tableNames = ["Menu_Items", "Users"];
  for (let i = 0; i < sql.length; i++) {

    con.query(sql[i], function (err, result, fields) {
      if (err) {
        console.log(sql[i]);
        console.log("failed to confirm DB -" + tableNames[i]);
        throw err;
      } else {
      }
    });
  }

}

module.exports = con;
