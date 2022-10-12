const express = require("express");
const router = express.Router()

const {getDayMissions, getMissionsList, insertMission, modifyMission} = require("../dao/Mission");

const {
    successResult,
    failureResult
} = require("../Result")

const getRealData = require("../GetRealData");

const {changeRewardService} = require("../service/User")

// 获取指定日期的任务
router.get('/getDayMissions', (req, res) => {
    const date = req.query.date
    getDayMissions(date).then((missions) => {
        res.status(200).send(successResult(JSON.parse(missions)))
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})
// 获取所有的任务
router.get('/missionsList', (req, res) => {
    getMissionsList().then((missions) => {

    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})
// 添加任务
router.post('/insertDayMission', (req, res) => {
    const {mission, today, reward} = req.body
    insertMission(mission, today, reward).then((result) => {
        if (JSON.parse(result).affectedRows === 1) {
            res.status(200).send(successResult("添加成功"))
        }
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})

// 修改任务
router.put('/modifyMission', (req, res) => {
    console.log(req.body)
    modifyMission(req.body).then(result => {
        if (JSON.parse(result).affectedRows === 1) {
            res.status(200).send(successResult("修改成功"))
        }
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })
})

router.put('/completeMission', (req, res) => {
    modifyMission(req.body).then(result => {
        if (JSON.parse(result).affectedRows === 1) {
           return changeRewardService({...req.body,operator: 'plus'})
        }
    }).then((resStatus) => {
        res.status(200).send(successResult(`任务完成,积分${resStatus}`))
    }).catch(err => {
        res.status(500).send(failureResult(err));
    })

})

module.exports = router
