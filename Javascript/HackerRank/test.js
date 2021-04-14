const puppy=require("puppeteer");  //All methods in puppeteer return promise(asynchronous) so we have to write await in every function  

const id="hakiga1366@aramidth.com";
const pass="gokusama";
let dataToType="sjlfskdlkakdsl";
let moderators=[`nocidi6371`, `ralariv999`, `yasekin473`, `sibaje3329`, `pamahex943`, `kipavof852`, `kejavib309`, `mijora9576`, `bokej31440`, `fenemo4073`];

async function main(){
     let browser=await puppy.launch({
         headless:false,          //to show chorme browser.
         defaultViewport:false,  //inside browser view width. 
         args:["--start-maximized"] //chrome browser width maximize.
     });
     let tabs=await browser.pages(); //returns array
     let tab=tabs[0];
     await tab.goto("https://www.hackerrank.com/auth/login");
     await tab.type("#input-1",id);
     await tab.type("#input-2",pass);
     await tab.click("button[type='submit']");
     await tab.waitForNavigation({waitUntil:"networkidle0"});
     await tab.click(".username.text-ellipsis");
     await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
     await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li",{visible:true});
     let administrationButtons=await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
     await administrationButtons[1].click();
     await tab.waitForSelector(".btn.btn-green.backbone.pull-right",{visible:true})
     let createChallengeButton=await tab.$(".btn.btn-green.backbone.pull-right");
     let createChallengeUrl=await tab.evaluate(function(ele){
         return ele.getAttribute("href");
     },createChallengeButton);
     for(let i=0;i<5;i++){
        await createChallenge("https://www.hackerrank.com"+createChallengeUrl,tab);
     }
     
    //  await browser.close()
}
    async function createChallenge(url,tab){
        await tab.goto(url);
        await tab.waitForSelector("#name",{visible:true});
        await tab.type("#name",dataToType);
        await tab.type("#preview",dataToType);
        await tab.waitForSelector(".CodeMirror textarea");
        let fourBoxes=await tab.$$(".CodeMirror textarea");
        for(let i=0;i<fourBoxes.length;i++){
            await fourBoxes[i].type(dataToType);
        }
        await tab.waitForSelector("#tags_tag",{visible:true});
        await tab.type("#tags_tag",dataToType);
        await tab.keyboard.press("Enter");
        await tab.click(".save-challenge.btn.btn-green");
        await tab.waitForSelector("li[data-tab='moderators']");
        await tab.click("li[data-tab='moderators']");
        await tab.waitForSelector("#moderator",{visible:true});
        for(let i of moderators){
            await tab.type("#moderator",i);
            await tab.keyboard.press("Enter");
        }
        await tab.click(".save-challenge.btn.btn-green");
    }

main();
