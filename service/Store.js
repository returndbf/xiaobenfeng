const {queryReward} = require("../dao/User");
const getRealData = require("../GetRealData");
const {changeRewardService} = require("./User");

const exchangeGoodsService =(goodsReward)=>{
    return new Promise((resolve,reject) =>{
        queryReward().then(currentReward => {
            const userReward= getRealData(currentReward).reward
            console.log(userReward,'userReward',goodsReward,'goodsReward')
            if(userReward >= Number(goodsReward)){
              return  changeRewardService({reward: goodsReward,operator: 'minus'})
            }else{
                resolve('积分不足')
            }
        }).then(()=>{
            resolve(`兑换成功`)
        })
    })

}
module.exports ={
    exchangeGoodsService
}
