const EventEmitter = require('events'); //EventEmitter is a class that allows us to create and handle events in Node.js

const myEmitter = new EventEmitter(); //myEmitter is an object of EventEmitter class

myEmitter.on('login',()=>{
    console.log('student logged successfully');
});

myEmitter.on('assignment',()=>{
    console.log('assignment submitted');
});

myEmitter.on('logout',()=>{
    console.log('student logged out');
});

myEmitter.on('exit',()=>{
    console.log('exiting the system');
});

myEmitter.emit('login'); //emit -> trigger the event
myEmitter.emit('assignment');
myEmitter.emit('logout');
myEmitter.emit('exit');


