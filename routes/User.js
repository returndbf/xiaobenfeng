const express = require("express");
const router = express.Router()

const {
    successResult,
    failureResult
} = require("../Result")

const getRealData = require("../GetRealData")

const {
    queryReward,
    queryUser
} = require("../dao/User")

const {changeRewardService} = require("../service/User")

router.get('/queryUser', (req, res) => {
     const secret = req.query.secret
    queryUser(secret).then(user => {
        if(getRealData(user)?.id){
            res.send(successResult(getRealData(user)))
        }else{
            res.send(failureResult('查无此人'))
        }
    })
})

router.get('/queryReward', (req, res) => {
    queryReward().then(reward => {
        res.status(200).send(successResult(getRealData(reward)));
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})

router.put('/changeReward', (req, res) => {
   changeRewardService(req.body).then(result=>{
       res.status(200).send(successResult(result))
   }).catch(err => {
       console.log(err)
       res.status(500).send(failureResult(err));
   })

})

module.exports = router
