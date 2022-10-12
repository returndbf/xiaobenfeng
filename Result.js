 class Result{
    code
    msg
    data
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

const successResult = (data) =>new Result(1,"success",data);

const failureResult = (data) =>new Result(0,"failure",data)

module.exports = {
    successResult,
    failureResult
};
