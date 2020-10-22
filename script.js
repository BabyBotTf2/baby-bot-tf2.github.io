var KILL_RATE = 71; // per hour
var AVG_BOT_NUM = 1029;

var botNumElement = document.getElementById('bot-num');
var fragsElement = document.getElementById('frags');
var daysElement = document.getElementById('days');
var ndcgElement = document.getElementById('ndcg');

var hoursSinceRelease = hoursDiff(Date.now(), new Date(2020, 9, 22, 12, 0, 0, 0)));
var currentTimeOfDay = new Date().getHours();

var botNum = AVG_BOT_NUM + 3 * ((currentTimeOfDay % 4) - 2);
var frags;
updateFrags();

setInterval(function() {
  updateFrags();
}, 2000)

function updateFrags() {
   frags = hoursSinceRelease * KILL_RATE * AVG_BOT_NUM;
   fragsElement.textContent = frags;
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
