const fs=require('fs');

//Synchronous beahviour
/*
let totalfiles=process.argv[2];
let filenumber=1;
function createFile(){
    if(filenumber > totalfiles ){
        return;
    }
    let lines=Math.floor(Math.random()*101);
    let arr=[];
    for(let i=0;i<lines;i++){
        let value=Math.floor(Math.random()*101);
        arr.push(value);
    }
    let writeData=arr.join('\r\n');
    fs.writeFile(filenumber +'.txt',writeData,createFile);
    console.log("You have generated:- ",filenumber,".txt");
    filenumber+=1;
}
createFile();
*/

//Asynchronous Behaviour
let totalfiles=process.argv[2];
let filenumber=1;
function printFileName(filenumber){
    console.log("You have generated:- ",filenumber,".txt");
}

function createFile(filenumber){
    let lines=Math.floor(Math.random()*101);
    let arr=[];
    for(let i=0;i<lines;i++){
        let value=Math.floor(Math.random()*101);
        arr.push(value);
    }
    let writeData=arr.join("\r\n");
    fs.writeFile(filenumber+".txt",writeData,function () {
        printFileName(filenumber);
    });
}

for(let i=0;i<totalfiles;i++){
    createFile(filenumber);
    filenumber++;
}