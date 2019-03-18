const request = require('request');


const locationRequest = (address) => {
    
    return new Promise((resolve, reject) => {
        let encodedURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
        requset({
            url: encodedURL,
            json : true
        },(error, response, body) => {
           if (error) {
               return reject('Could not connect to google map server.');
           }else if (body.status === 'ZERO_RESULT') {
               return reject('Location not found on google map server.');
           }else{
               res = {
                    response, 
                    body
               }
               return resolve(res);
           }
        })
    })
} 

const weatherRequest = locationRequest("Nigeria").then((res) => {
    return new Promise((resolve, reject) => {
       let encodedURL = "https://api.darksky.net/forecast/2e572d79f0a288a9003b19102c749c41/37.8267,-122.4233";
       request({
            url: encodedURL,
            json: true,
       }, (error, response, body) => {
            if (error) {
                reject('Could not load weather location for the the Address');
            }else{
                res = {
                    response, 
                    body
               }
                resolve(res);
            }
       })
    })
}, (err) => {
    // Handle Error
}).then((res) => {
    console.log('Everything worked Perfectly!')
}, (err) => {
    // handle Second Error
});