const EventEmitter = require('events'); //EventEmitter is a class that allows us to create and handle events in Node.js

const myEmitter = new EventEmitter(); //myEmitter is an object of EventEmitter class

myEmitter.on('greet',(name)=>{                         //on is the listner
    console.log(`Hello, ${name}! Welcome to Node.js`);
});

myEmitter.on('exit',()=>{
    console.log("Application Closed");
});

myEmitter.emit('greet','2nd year'); //emit -> trigger the event
myEmitter.emit('exit');


