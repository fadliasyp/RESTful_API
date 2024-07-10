class ResponseError extends Error {

    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export {
    ResponseError
}
// function ResponseError(){
//     throw {status: 500};
// }

// export{
//     ResponseError
// }