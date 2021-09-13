const request = require('request');
const promisify = require('util').promisify;


var promise = promisify(function getGoogleHomePage(finalCallBack){
    request('http://www.google.com', function(error, response, body){
        if (error) {
            finalCallBack(error);
            return error;
        }
        if (response.statusCode) {
            finalCallBack(response.statusCode);
            return response.statusCode;
        }
        if (body) {
            finalCallBack(null,body);
            return body;
        }
    })
})
promise().then((res)=>{
    return res;
}).catch((error)=>{
    return error;
})

console.log( promise((result)=>{
    console.log("RESULT ==>", result);
}));

// console.log(getGoogleHomePage((result)=>{
//     console.log("result ==>", result);
// }))