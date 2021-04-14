const puppy=require("puppeteer");
async function ipl(){
    let browser=await puppy.launch({
        headless:false,          //to show chorme browser.
        defaultViewport:false,  //inside browser view width. 
        args:["--start-maximized"] //chrome browser width maximize.
    });
    let tabs=await browser.pages(); //returns array
    let tab=tabs[0];
    await tab.goto("https://www.cricbuzz.com/cricket-series/3472/indian-premier-league-2021/squads");
    let teams=await tab.$$(".cb-col.cb-col-100.cb-series-brdr.cb-stats-lft-ancr");
    for(let i=0;i<teams.length;i++){
        await teams[i].click();
        await new Promise(function(resolve,reject){   //synchronous setTimeout()
            setTimeout(resolve,2000);
        })
    }
    await getPlayers(tab);
}

async function getPlayers(tab){
    let players=await tab.$$(".cb-col.cb-col-50");
    let playersUrls=[];
    for(let player of players){
        let url=await tab.evaluate(function(ele){
            return ele.getAttribute("href");
        },player);
        playersUrls.push("https://www.cricbuzz.com/"+url);
    }
    // console.log(playersUrls);
}
ipl();