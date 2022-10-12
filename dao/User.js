const query  =require('../sql/Query')

// 查询目前积分
const queryReward = () =>{
    return query(`select reward from user where user ="miaomiao"`)
}

// 用于添加或减少
const changeReward = (reward) =>{
    return query(`update user set reward = ${reward} where user = "miaomiao" `)
}
const queryUser = (secret) =>{
    return query(`select * from user where secret = '${secret}'`)
}
module.exports = {
    queryReward,
    changeReward,
    queryUser
}
