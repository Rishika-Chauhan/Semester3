const fs = require('fs').promises;

async function writeFile(){
    try{
        await fs.writeFile("promise.txt","Hello Students!");
        console.log("File created and data written successfully");
    }
    catch(error){
        console.error("Error:", error);
    }
}

//read file 
async function readFile(){
    try{
        const data = await fs.readFile("promise.txt","utf8");
        console.log("File Content:");
        console.log(data);
    }
    catch(error){
        console.error("Error:", error);
    }
}

//update 
async function updateFile(){
    try{
        await fs.appendFile("promise.txt","\nThis is the new line");
        console.log("File content updated successfully");
    }
    catch(error){
        console.error("Error:", error);
    }
}

//append 
async function appendFile(){
    try{
        await fs.appendFile("promise.txt","\nWelcome to FSD Training");
        console.log("Data appended successfully");
    }
    catch(error){
        console.error("Error:", error);
    }
}

//rename 
async function renameFile(){
    try{
        await fs.rename("promise.txt","promise_new.txt");
        console.log("File renamed successfully");
    }
    catch(error){
        console.error("Error:", error);
    }
}

//delete

async function deleteFile(){
    try{
        await fs.unlink("promise_new.txt");
        console.log("File deleted successfully");
    }
    catch(error){
        console.error("Error:", error);
    }
}
writeFile()
    .then(readFile)
    .then(updateFile)
    .then(appendFile)
    .then(renameFile)
    .then(deleteFile);
    