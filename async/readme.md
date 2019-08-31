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