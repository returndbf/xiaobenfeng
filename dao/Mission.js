
const query  =require('../sql/Query')

// 获取一天的任务
const getDayMissions = (date) => {
    return query(`select * from mission where today = '${date}'`)
}
// 获取所有任务
const getMissionsList = () => {
    return query(`select * from mission`)
}
// 添加新任务
const insertMission = ({mission_name, today, reward,is_special}) => {
    return query(`INSERT INTO mission(id,mission_name,today,reward,is_complete,is_special) 
        VALUES (REPLACE(UUID(),"-",""),'${mission_name}','${today}','${reward}',0,'${is_special}')`)
}
// 修改任务
const modifyMission = ({mission_name, today, reward, id,is_complete,is_special}) => {
    return query(`UPDATE mission set mission_name = '${mission_name}',today = '${today}',reward = '${reward}',is_complete = ${is_complete},is_special = '${is_special}' where id ='${id}'`)
}



module.exports = {
    getDayMissions,
    insertMission,
    getMissionsList,
    modifyMission
}
