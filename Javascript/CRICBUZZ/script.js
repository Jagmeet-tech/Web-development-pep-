require('chromedriver')
const wd=require('selenium-webdriver')
const browser=new wd.Builder().forBrowser('chrome').build();
// async function main(){
//     await browser.get("https://www.youtube.com")
//     console.log("hello");
// }
// main();

//browser ekk container btata hai jismein dhundna hai but dhundne vala kam wd se hoga.  
//browser ke method async hi hote hai toh usse pehle await lagao taki uske baad vali instruction tabh tak na chale jab tak hmari vala chal na jaye. 
//wait method just for safety ki agar elements load hone pe time le rahe hai toh uske baad ki instruction na chal jaye kyunki await method ki bhi limitations hai time ki but wait ki koi limitations nhi hai.

let matchId = process.argv[2];
let innings = process.argv[3];
let batsmenScorecard = [];
let batsmenKeys = ["playerName", "out", "runs", "ballsPlayed", "fours", "sixes", "strikeRate"];
async function main () {
    await browser.get("https://www.cricbuzz.com/live-cricket-scores/" + matchId);
    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-nav-bar a")));
    let buttons = await browser.findElements(wd.By.css(".cb-nav-bar a"));
    await buttons[1].click();
    await browser.wait(wd.until.elementLocated(wd.By.css("#innings_" + innings + " .cb-col.cb-col-100.cb-ltst-wgt-hdr")));
    let tables = await browser.findElements(wd.By.css("#innings_" + innings + " .cb-col.cb-col-100.cb-ltst-wgt-hdr"));
    let innings1BatsmenRows = await tables[0].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));
    for(let i = 0; i < innings1BatsmenRows.length; i++) {
        let columns = await innings1BatsmenRows[i].findElements(wd.By.css("div"));
        if(columns.length == 7) {
            let data = {};
            for(let j = 0; j < columns.length; j++) {
                data[batsmenKeys[j]] = await columns[j].getAttribute("innerText");
            }
            batsmenScorecard.push(data);
        }
    }
    console.log(batsmenScorecard);
    let inningsBowlerRows = await tables[1].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));
    for(let i = 0; i < inningsBowlerRows.length; i++) {
        let columns = await inningsBowlerRows[i].findElements(wd.By.css("div"));
        if(columns.length == 8) {
            let data = {};
            for(let j = 0; j < columns.length; j++) {
                data[bowlerKeys[j]] = await columns[j].getAttribute("innerText");
            }
            bowlerScorecard.push(data);
        }
    }
    console.log(bowlerScorecard);
    await browser.close();
 }

 main();
 //enter this command- node script.js 30880 1