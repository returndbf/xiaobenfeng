//import getRealData from "../GetRealData";
// import {failureResult, successResult} from "../Result";
const getRealData = require("../getRealData");

const {failureResult, successResult} = require("../Result")
const {
    queryReward,
    changeReward
} = require("../dao/User")

const changeRewardService = ({reward, operator}) => {
    const isPlus = operator === 'plus'
    return new Promise((resolve, reject) => {
        queryReward().then(currentReward => {
            return getRealData(currentReward).reward
        }).then(currentReward => {
            return changeReward(isPlus ? currentReward + Number(reward) : currentReward - Number(reward))
        }).then((result) => {
            if (JSON.parse(result).affectedRows === 1) {
                resolve(isPlus ? '增加成功' : '减成功')
            }
        }).catch(err => {
            reject(err)
        })
    })

}
module.exports = {
    changeRewardService
}
