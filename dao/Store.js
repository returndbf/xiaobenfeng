const query  =require('../sql/Query')

// 获取兑换商城所有物品
const getStoreList = () => {
    return query(`SELECT * FROM store`)
}

// 添加物品
const insertStore = ({goods,reward,icon,description}) => {
    return query(`INSERT INTO store(id,goods, reward, icon, description,del_flag) VALUES (REPLACE(UUID(),"-",""), '${goods}', '${reward}', '${icon}', '${description}',0)`)
}

// 修改商品

const modifyStore = ({goods,reward,icon,description}) => {
    return query(`UPDATE store set store = '${goods}', reward = '${reward}', icon = '${icon}' , description = '${description}' where  id ='${id}'`)
}
//删除商品

const deleteStore = (id)=>{
    return query(`UPDATE store set del_flag = 1 where  id ='${id}'`)
}

module.exports ={
    getStoreList,
    insertStore,
    modifyStore,
    deleteStore
}
