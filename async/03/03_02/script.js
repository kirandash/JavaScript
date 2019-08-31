// Add get() function here
function get(url) {
    return new Promise(function(resolve, reject){
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url);
        httpRequest.onload = function() {
            if(httpRequest.status === 200){
                // success(httpRequest.responseText);
                resolve(httpRequest.responseText); // resolve callback
            } else {
                // fail(httpRequest.status);
                reject(Error(httpRequest.status)); // reject callback, Error() is not Promise specific, it is a plain js fn that helps us view errors in a better structure
            }
        }

        // Handler network errors
        httpRequest.onerror = function(){
            reject(Error('Network Error!'));
        }
        httpRequest.send();
    });
};

// Success Handler
function successHandler(data) {
    const dataObj = JSON.parse(data);
    const weatherDiv = document.querySelector('#weather');
    const div = `
        <h2 class="top">
        <img
            src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
            alt="${dataObj.weather[0].description}"
            width="50"
            height="50"
        />${dataObj.name}
        </h2>
        <p>
        <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${dataObj.weather[0].description}
        </p>
    `
    return div;
    // weatherDiv.innerHTML = weatherFragment;
    // weatherDiv.classList.remove('hidden');
}

// Fail Handler
function failHandler(status){
    console.log(status);
    // const weatherDiv = document.querySelector('#weather');
    // weatherDiv.classList.remove('hidden');
}

function tempToF(kelvin) {
    return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '3a5fca5e97c81f58bf0d583eab857a15';
    // const apiKey = '';
    
    const weatherDiv = document.querySelector('#weather');

    const locations = [
        'los+angeles,us',
        'san+francisco,us',
        'lone+pine,us',
        'mariposa,us'
    ];

    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' + apiKey;
    const urls = locations.map(function(location){
        return `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
    });
    // get(url, successHandler, failHandler);
    // console.log(get(url));
    // get function returns a promise which we can work with next
    // get(url)
    // Passing array of promises
    /*Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
    .then(function(results){
        return results.map(function(result){
            return successHandler(result); // returns single result of template string
        }); // returns set of all 4 template string literals
    }).then(function(literals){
        weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`;
    }).catch(function(status){
        failHandler(status);
    }).finally(function(){
        // Common/Default code moved to finally block
        // const weatherDiv = document.querySelector('#weather');
        weatherDiv.classList.remove('hidden');
    });*/
    (async function(){
        let results = [];
        results.push(await get(urls[0]));
        results.push(await get(urls[1]));
        results.push(await get(urls[2]));
        results.push(await get(urls[3]));

        // Note that the synchronous code here will execute only after the above mentioned asynchronous calls finish executing
        let literals = results.map(function(result){
            return successHandler(result); // returns single result of template string
        });

        weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`;
        weatherDiv.classList.remove('hidden');

    })(); // Immediately invoked async function
});