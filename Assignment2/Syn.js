const fs = require('fs');
fs.writeFileSync('Synstudent.txt','This is the experiment 2','utf8');
console.log('file is written successfully');

// read
const data = fs.readFileSync('Synstudent.txt','utf8');
console.log('File Content:');
console.log(data);

// append
fs.appendFileSync('Synstudent.txt','\nThis is the new line','utf8');
console.log('file content is appended ');

// // delete
// fs.unlinkSync('example.txt');
// console.log('file is deleted successfully here');

// create folder
// fs.mkdirSync('folder');
// console.log('folder is created successfully here');

// remove folder
// fs.rmdirSync('folder');
// console.log('folder is deleted successfully here');

// check file exist or not 
if (fs.existsSync('Synstudent.txt')) {
  console.log('File exists!');
} 
else {
  console.log('File does not exist.');
}