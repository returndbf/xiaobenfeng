// const mysql = require('mysql2');
// let connection = mysql.createConnection({
//
// });
//
//
//
// module.exports = connection
var mysql = require('mysql2');
var connection = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'miaomiao'
}


// 用于保存数据连接实例
var db = null;

var pingInterval;

// 如果数据连接出错，则重新连接
function handleError(err) {
    logger.info(err.stack || err);
    connect();
}

// 建立数据库连接
function connect() {
    if (db !== null) {
        db.destroy();
        db = null;
    }

    db = mysql.createConnection(connection);
    db.connect(function (err) {
        if (err) {
            logger.info("error when connecting to db,reConnecting after 2 seconds:", err);
            setTimeout(connect, 2000);
        }
    });
    db.on("error", handleError);

    // 每个小时ping一次数据库，保持数据库连接状态
    clearInterval(pingInterval);
    pingInterval = setInterval(() => {
        console.log('ping...');
        db.ping((err) => {
            if (err) {
                console.log('ping error: ' + JSON.stringify(err));
            }
        });
    }, 3600000);
}

connect();
module.exports = db;
