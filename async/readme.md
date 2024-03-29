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

### 2.3 Returned promise with then()
get(url).then(function(result){
    successHandler(result);
});

### 2.4 Rejected promise with catch()
get(url).then(function(result){
    successHandler(result);
}).catch(function(status){ // Imp
    failHandler(status);
});

### 2.5 Default promise handler - finally()
code in finally() will execute no matter resolve() or reject() is executed.
get(url).then(function(result){
    ...
}).catch(function(status){
    ...
}).finally(function(){
    ...
});

### 2.6 Multiple promises - .all([])
Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])

### 2.7 Promise - Polyfills
Promises: Introduced in 2015
Won't work directly in older browsers or opera mini.
Thus use polyfills
https://github.com/taylorhakes/promise-polyfill

## 3. Programming Asynchronously with Async/Await
### 3.1 Intro to Async/Await model
Introduced in 2017
Easier to read than promises
async function readyData() {
    let data = await getData();
    let formattedData = await formatData(data);
    return formattedData;
}

### 3.2 Implementing Async/Await
async - used to declare a function as asynchronous
await - waits for the async call to finish

### 3.3 Handling errors with Async/Await - try & catch, finally
async/await don't have built in .catch error handler like promises. But JS try and catch can be used

### 3.4 Transpiling async/await code
Async/await depends on promises.
Thus promises polyfils has to be used for backwards compatibility.
But first async/await has to be transpiled to promises using babel.
https://babeljs.io/en/repl
