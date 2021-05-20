const generateResponse = (statusCode, body) => {
    return {
        statusCode,
        body
    }
}

const getToken = (req) => {
    return req.header("Authorization").split(" ")[1];
}

module.exports = {
    generateResponse,
    getToken
}