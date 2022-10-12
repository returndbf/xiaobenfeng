const getRealData = (data) => {
    data = JSON.parse(data)
    return data[0]
}
module.exports = getRealData
