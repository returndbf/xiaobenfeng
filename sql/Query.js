const connection = require("./Connection");
const query = (queryStr) => {
    return new Promise((resolve, reject) => {
        connection.query((queryStr), (err, res) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(JSON.stringify(res))
        })
    })
}

module.exports = query
