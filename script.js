var KILL_RATE = 6; // 1 bot per hour
var AVG_BOT_NUM = 64;
var AVG_KD = 0.11;
var releaseDate = new Date(2020, 9, 21, 22, 0, 0, 0);

var botNumElement = document.getElementById('bot-num');
var killsElement = document.getElementById('kills');
var deathsElement = document.getElementById('deaths');
var kdElement = document.getElementById('kd');
var daysElement = document.getElementById('days');
var ndcgElement = document.getElementById('ndcg');

updateBotNum();
updateKills();
updateDeaths();
updateKd();
updateDays();

repeatedlyUpdateBotNum();
repeatedlyUpdateKillsDeaths();

function updateBotNum() {
   var currentTimeOfDay = new Date().getMinutes();
   var botNum =  botNum = AVG_BOT_NUM + 4 * ((currentTimeOfDay % 4) - 2);
   botNumElement.textContent = botNum;
}

function updateKills() {
   var hoursSinceRelease = (Date.now() - releaseDate) / 60 / 60 / 1000;
   var kills = hoursSinceRelease * KILL_RATE * AVG_BOT_NUM;
   killsElement.textContent = numberWithCommas(kills.toFixed(0));
}

function updateDeaths() {
   var hoursSinceRelease = (Date.now() - releaseDate) / 60 / 60 / 1000;
   var deaths = hoursSinceRelease * KILL_RATE * AVG_BOT_NUM / AVG_KD;
   deathsElement.textContent = numberWithCommas(deaths.toFixed(0));
}

function updateKd() {
   kdElement.textContent = AVG_KD.toFixed(2);
}

function updateDays() {
   var daysSinceRelease =  (Date.now() - releaseDate) / 24 / 60 / 60 / 1000;
   daysElement.textContent = numberWithCommas(daysSinceRelease.toFixed(2));
}

function repeatedlyUpdateBotNum()  {
    setInterval(function() {
      updateBotNum();
    }, 1000 * 60);
}

function repeatedlyUpdateKillsDeaths()  {
    var killDelay = (4 + Math.random()) * 2000;
    setTimeout(function() {
      updateKills();
      updateDeaths();
      repeatedlyUpdateKillsDeaths();
    }, killDelay);
}


function secondsDiff(d1, d2) {
   let millisecondDiff = d2 - d1;
   let secDiff = Math.floor(( d2 - d1) / 1000);
   return secDiff;
}

function minutesDiff(d1, d2) {
     let seconds = secondsDiff(d1, d2);
     let minutesDiff = Math.floor(seconds / 60);
     return minutesDiff;
}

function hoursDiff(d1, d2) {
   let minutes = minutesDiff(d1, d2);
   let hoursDiff = Math.floor(minutes / 60);
   return hoursDiff;
}

function daysDiff(d1, d2) {
   let hours = hoursDiff(d1, d2);
   let daysDiff = Math.floor(hours / 24);
   return daysDiff;
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, '$1,$2');
    return x;
}
