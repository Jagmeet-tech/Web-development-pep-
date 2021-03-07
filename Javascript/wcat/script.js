#!/usr/bin/env node   

/*
To use wcat command you have to write "bin":{"script.js"} as key value in package.json
and you have to write 1 line given here to provide that the enviroment(env) is node.
and to use globaly in other projects also you have to link it using npm link commmand.  
*/
const fs=require('fs');
// fs.writeFileSync('abc.txt',"Hi its monty");
// let data=fs.readFileSync('abc.txt','utf-8');
// console.log(data);
// console.log(process.argv);

let arguments=process.argv.slice(2);
//console.log(arguments);
function wcat(arguments){
   /* let data=fs.readFileSync(arguments[0],"utf-8");
    console.log(data);
    */
   for(let i=0;i<arguments.length;i++){
       let data=fs.readFileSync(arguments[i],'utf-8');
       console.log(data);
   }
}
// wcat(arguments);
function commands(arguments){
    let options=arguments.filter(function(data,index){
        return data.startsWith('-');
    });
    let files=arguments.filter(function(data,index){
        return !data.startsWith('-');
    });
    if(files.length==0){
        console.log("Please verify a filename..");
        return;
    }
    for(let i=0;i<files.length;i++){
        if(!fs.existsSync(files[i])){
            console.log(files[i]+" does not exist..");
            return;
        }  
    }
    /*
    '-s' means display txt files without empty lines.
    '-n' means display txt files with numbering to all lines.(whether empty or non empty line)
    '-b' means displaying numbering to non empty lines only.
    '-w' means writing one file content to another (overides it).
    '-a' means to append the file data. 
    */
    let numbering=1;
    for(let i=0;i<files.length;i++){   
        let data=fs.readFileSync(files[i],'utf-8');
        if(options.includes('-s')){
            let lines=data.split('\r\n');
            for(let j=0;j<lines.length;j++){
                if(lines[j]!=""){
                    if(options.includes('-n')){
                        console.log(numbering+". "+lines[j]);
                        numbering++;
                    }
                    else
                        console.log(lines[j]);    
                }
            }
        }
        else if(options.includes('-n') && !options.includes('-b') || options.includes('-n') && options.includes('-b') && options.indexOf('-n') < options.indexOf('-b')){
            let lines=data.split('\r\n');
            for(let j=0;j<lines.length;j++){
                console.log(numbering+". "+lines[j]);
                numbering++;
            }
        }
        else if(options.includes('-b')){
            let lines=data.split('\r\n');
            for(let j=0;j<lines.length;j++){
                if(lines[j]!=""){
                    console.log(numbering+". "+lines[j]);
                    numbering++;
                }
                else
                    console.log(lines[j]);
            }
        }
        else if(options.includes('-w')){
            console.log(arguments);
            if(files.length!=2 || arguments.indexOf('-w')!=1){
                console.log("unable to run this command..");
                return;
            }
            let data=fs.readFileSync(files[0],'utf-8');
            fs.writeFileSync(files[1],data);
        }
        else if(options.includes('-a')){
            if(files.length != 2 || arguments.indexOf("-a") != 1) {
                console.log("unable to run this command");
                return;
            }

            let data1 = fs.readFileSync(files[0], "utf-8");
            let data2 = fs.readFileSync(files[1], "utf-8");
            fs.writeFileSync(files[1], data2 + data1);
            return;
        }
        else{    
            console.log(data);
        }
    }
}
 commands(arguments);