let fs=require('fs');
// let promise=new Promise( function(resolve,reject){
//     if(fs.existsSync("node_modules")){
//         resolve("THIS is resolved..");
//     }
//     else{
//         reject("Its not resolved..");
//     }
// })
// console.log(promise);
// promise.then(()=>{
//     console.log("THAnks");
// })
//console.log(promise);



//=====================================================================================
// function callback(data){
//     console.log(data);
//     console.log("2nd file read");
// }
// let readFile=fs.promises.readFile("1.txt","utf-8");
// //console.log(readFile); returns promise wrapper with pending state as resolve or reject is not called yet due to readFile asyn fn.
// readFile.then(function(data){
//     console.log(data);
//     fs.readFile("2.txt","utf-8",callback);///not working
//     console.log("hello");
// }).catch(function(data){
//     console.log(data);
// })

// readFile.then((data)=>{
//     console.log(data);
// })

let promise1=new Promise((resolve,reject)=>{
   setTimeout(()=>{
       resolve("promise1 completed");
   },2000);
});
let promise2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("promise2 completed");
    },5000);
 });
console.log(promise1,promise2);

promise1.then(function(data){
    console.log(data);   //print after 2 sec form 0
})

promise2.then(function(data){
    console.log(data);  //print after 5 sec from 0
})