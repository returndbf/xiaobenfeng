const express = require("express")
const server = express()
const router = express.Router()
server.use(router)
router.use(express.urlencoded({
    extended: false
}));
router.use(express.json());


const mission = require("./routes/Mission")
const store = require("./routes/Store")
const user = require("./routes/User")

server.use('/mission',mission)
server.use('/store',store)
server.use('/user',user)

router.get('/areUStudyToday', (req, res) => {
    let name = req.query.name
    res.send(`${name}今天学习了吗`)
})

server.listen(8844, () => {
    console.log("server runing")
})

// 解决跨域问题
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


module.exports = router;
