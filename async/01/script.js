console.log("Hi");

setTimeout(function(){
    console.log("Asynchronous result! After 5 seconds!");
}, 5000);

setTimeout(function(){
    console.log("Asynchronous result! After 0 seconds!"); // This will be logged to the end since all asynchronous calls run parallely but stacked up to execute after the main stack execution finishes
}, 0);

console.log("Synchronous result!");