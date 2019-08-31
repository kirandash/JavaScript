# JS Async

## Intro and Setup
Plugins to install:
1. Liver sever - By Ritwick Dey
2. Bracket Pair Colorizer - Coenraads
3. Indenticator - Sir Tori

API Key:
https://home.openweathermap.org/api_keys
3a5fca5e97c81f58bf0d583eab857a15

## 1. Programming Asynchronously with Callbacks
### 1.1 Understanding callbacks
Asynchronous calls run parallely but stacked up to execute after the main stack execution finishes

### 1.2 Callback - XMLHttpRequest
function get(url, success) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.onload = function() {
        success(httpRequest.responseText);
    }
    httpRequest.send();
};
get(url, successHandler);

### 1.3 Fail Callback
if(httpRequest.status === 200){
    success(httpRequest.responseText);
} else {
    fail(httpRequest.status);
}

get(url, successHandler, failHandler);

## 2. Programming Asynchronously with Promises
### 2.1 Promises - Intro
Promise: An object that represents the result of an asynchronous operation.
Contains two properties: a. state: "pending", "fulfilled" or "rejected"
b. result property: "undefined", "value" or "error"

Possible cases:
a. resolve(value) => state: "fulfilled", result: "value"
b. reject(error) => state: "rejected", result: "error"

Ex: let promise = new Promise(function(resolve, reject){
    if(...){
        resolve(value);
    }else{
        reject(error);
    }
});

Once resolved,
promise.then(function(result){
    ...
    return newResult;
}).then(function(result){
    ...
    return newResult2;
});

### 2.2 Promises - In use
 return new Promise(function(resolve, reject){ // Imp
    ......
    httpRequest.onload = function() {
        if(httpRequest.status === 200){
            resolve(httpRequest.responseText); // Imp
        } else {
            reject(Error(httpRequest.status)); // Imp
        }
    }
    httpRequest.send();
});
console.log(get(url)); // Imp