const puppy=require("puppeteer");
const fs=require("fs");

let finalData=[];
let topicToSearch=process.argv.slice(2).join(" ");

async function main(){
    let browser=await puppy.launch({
        headless:false,          //to show chorme browser.
        defaultViewport:false,  //inside browser view width. 
        args:["--start-maximized"]
    });
    let tabs=await browser.pages();
    let tab=await tabs[0];
    await tab.goto("https://www.youtube.com");
    await tab.waitForSelector("input[placeholder='Search']");
    await tab.type("input[placeholder='Search']",topicToSearch);
    await tab.click("#container #search-icon-legacy");
    await tab.waitForNavigation({waitUntil:"networkidle0"});
    let allVideo=await tab.$$("#thumbnail");
    let allVideoUrls=[];
    await new Promise(function(resolve,reject) {
        setTimeout(resolve,1000);
    })
    for(let i of allVideo){
        let allVideoUrl=await tab.evaluate(function(ele){
            return ele.getAttribute("href");
        },i)
        allVideoUrls.push(allVideoUrl);
    }
    let finalVideoUrl=[];
    for(let i of allVideoUrls){
        if(i!=null)
            finalVideoUrl.push("https://www.youtube.com/"+i);
    }
    for(let i =0;i<6;i++){
        await tab.goto(finalVideoUrl[i]);
        await tab.waitForSelector("#upload-info .yt-simple-endpoint.style-scope.yt-formatted-string",{visible:true});
        let channelName=await tab.$("#upload-info .yt-simple-endpoint.style-scope.yt-formatted-string");
        let name=await tab.evaluate(function(ele){
            return ele.textContent;
        },channelName)

        //Views================
        let channelViews=await tab.$(".short-view-count.style-scope.ytd-video-view-count-renderer");
        let views=await tab.evaluate(function(ele){
            return ele.textContent;
        },channelViews)

        //subscribers==========
        await tab.waitForSelector("yt-formatted-string[id='owner-sub-count']",{visible:true});
        let subcribers=await tab.$("yt-formatted-string[id='owner-sub-count']");
        let subscriberNo=await tab.evaluate(function(ele){
            return ele.textContent;
        },subcribers);

        //likes and dislikes
        await tab.waitForSelector("#info yt-formatted-string[id='text']",{visible:true});
        let likesAndDislikes=await tab.$$("#info yt-formatted-string[id='text']");
        let likes=await tab.evaluate(function(ele){
            return ele.textContent; 
        },likesAndDislikes[0]);
        let dislikes=await tab.evaluate(function(ele){
            return ele.textContent; 
        },likesAndDislikes[1]);

        //comments=======
        let totalComments=[];
        await tab.evaluate( () => {
            window.scrollBy(0, window.innerHeight);
        });
        await tab.waitForSelector("yt-formatted-string[id='content-text']",{visible:true});
        let comments=await tab.$$("yt-formatted-string[id='content-text']");
        let count=1;
         for(let j of comments){
            let comment=await tab.evaluate(function(ele){
                return ele.textContent;
            },j)
            totalComments.push((count+".") +comment.split("\n").join(" "));
            count++;
        }

         //description==========================
         await tab.waitForSelector("yt-formatted-string[class='more-button style-scope ytd-video-secondary-info-renderer']",{visible:true});
         await tab.click("yt-formatted-string[class='more-button style-scope ytd-video-secondary-info-renderer']");
         await tab.waitForSelector("#description span",{visible:true});
         let description =await tab.$$("#description span");
         let s;
         for(let k=1;k<description.length;k++){
            let mainDes=await tab.evaluate(function(ele){
                 return ele.textContent;
             },description[k]);
             s+=mainDes;
         }
         s=s.split("\n").join(" ");
        finalData[i]={"ChannelName":name,"Subscribers":subscriberNo,"Views":views,"Likes":likes,"Dislikes":dislikes,"VideoLink":finalVideoUrl[i],"Description":s,"Comments":totalComments};
    }
    fs.writeFileSync("youtubeInfo.json",JSON.stringify(finalData));
    await browser.close();

}

main();