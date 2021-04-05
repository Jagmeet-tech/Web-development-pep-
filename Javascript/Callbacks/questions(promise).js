//1
// function job() {
//     return new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             resolve("hello world");
//         },2000);
//     })
// }

// //2
// function job(data) {
//     return new Promise(function(resolve,reject){
//         if(typeof(data)!="number")
//             reject("error");
//         else{
//             if(data%2==0){
//                 setTimeout(()=>{
//                     reject("even")
//                 },2000)
//             }
//             else{
//                 setTimeout(()=>{
//                     resolve("odd")
//                 },1000)
//             }
//         }    
//     })
// }

// //3
// var promise = job1();

// promise

// .then(function(data1) {
//     console.log('data1', data1);
//     return job2();
// })

// .then(function(data2) {
//     console.log('data2', data2);
//     return 'Hello world';
// })

// .then(function(data3) {
//     console.log('data3', data3);
// });

// function job1() {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve('result of job 1');
//         }, 1000);
//     });
// }

// function job2() {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve('result of job 2');
//         }, 1000);
//     });
// }
function callback1(){
    console.log("callback1 called");
}
function callback2(){
    console.log("callback2 called");
}

function job(callback1, callback2) {
    setTimeout(()=>{
        callback1();
    },2000)
    
    setTimeout(()=>{
        callback2();
    },1000) 
    setTimeout(()=>{
        callback2();
    },1000) 
    setTimeout(()=>{
        callback2();
    },1000) 
    
}
job(callback1,callback2);