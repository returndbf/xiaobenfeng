const express = require("express");
const router = express.Router()


const {
    getStoreList,
    insertStore,
    modifyStore,
    deleteStore
} = require("../dao/Store");

const {
    successResult,
    failureResult
} = require("../Result");
const {queryReward} = require("../dao/User");
const getRealData = require("../GetRealData");
const {exchangeGoodsService} = require("../service/Store");


// 获取商城物品

router.get('/getStoreList', (req, res) => {
    getStoreList().then((stores) => {
        res.status(200).send(successResult(JSON.parse(stores)));
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})

// 添加物品
router.post('/insertGoods', (req, res) => {
    const { goods,reward,icon,description } = req.body
    insertStore(goods,reward,icon,description).then((result) => {
        if (JSON.parse(result).affectedRows === 1){
            res.status(200).send(successResult("添加成功"))
        }
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})

// 修改物品
router.put('/updateGoods', (req, res) => {
    const { goods,reward,icon,description } = req.body
    modifyStore(goods,reward,icon,description).then((result) => {
        if (JSON.parse(result).affectedRows === 1){
            res.status(200).send(successResult("修改成功"))
        }
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})

router.put('/deleteGoods', (req, res) => {
    const {id} = req.body
    deleteStore(id).then((res)=>{
        if (JSON.parse(result).affectedRows === 1){
            res.status(200).send(successResult("删除成功"))
        }
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})

router.put('/exchangeGoods', (req, res) => {
    const {reward} = req.body
    console.log(req.body)
    exchangeGoodsService(reward).then(result=>{
        res.status(200).send(successResult(result))
    })
})
module.exports = router
