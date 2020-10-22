var KILL_RATE = 71; // per hour
var AVG_BOT_NUM = 64;
var AVG_KD = 1.634342;
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

repeatedlyUpdateKills();
repeatedlyUpdateDeaths();

function updateBotNum() {
   var currentTimeOfDay = new Date().getHours();
   var botNum =  botNum = AVG_BOT_NUM + 3 * ((currentTimeOfDay % 4) - 2);
   botNumElement.textContent = botNum;
}

function updateKills() {
   var hoursSinceRelease = (Date.now() - releaseDate) / 60 / 60 / 1000;
   var kills = hoursSinceRelease * KILL_RATE * AVG_BOT_NUM;
   killsElement.textContent = kills.toFixed(0);
}

function updateDeaths() {
   var hoursSinceRelease = (Date.now() - releaseDate) / 60 / 60 / 1000;
   var deaths = hoursSinceRelease * KILL_RATE * AVG_BOT_NUM / AVG_KD;
   deathsElement.textContent = deaths.toFixed(0);
}

function updateKd() {
   kdElement.textContent = AVG_KD.toFixed(2);
}

function updateDays() {
   var daysSinceRelease =  (Date.now() - releaseDate) / 24 / 60 / 60 / 1000;
   daysElement.textContent = daysSinceRelease.toFixed(2);
}



function repeatedlyUpdateKills()  {
    var killDelay = (2 + Math.random()) * 1000;
    setTimeout(function() {
      updateKills();
      repeatedlyUpdateKills();
    }, killDelay);
}

function repeatedlyUpdateDeaths()  {
    var deathDelay = (2 + Math.random()) * 1000;
    setTimeout(function() {
      updateDeaths();
      repeatedlyUpdateDeaths();
    }, deathDelay);
}




function secondsDiff(d1, d2) {
   let millisecondDiff = d2 - d1;
   let secDiff = Math.floor( ( d2 - d1) / 1000 );
   return secDiff;
}

function minutesDiff(d1, d2) {
     let seconds = secondsDiff(d1, d2);
     let minutesDiff = Math.floor( seconds / 60 );
     return minutesDiff;
}

function hoursDiff(d1, d2) {
   let minutes = minutesDiff(d1, d2);
   let hoursDiff = Math.floor( minutes / 60 );
   return hoursDiff;
}

function daysDiff(d1, d2) {
   let hours = hoursDiff(d1, d2);
   let daysDiff = Math.floor( hours / 24 );
   return daysDiff;
}
