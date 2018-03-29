
var SCHEDULE = [
    [new Date('Fri Mar 30 2018 8:30:00'),'Hacking begins'],
    [new Date('Fri Mar 30 2018 10:10:00'),'Tea & snacks'],
    [new Date('Fri Mar 30 2018 11:30:00'),'First Round of Training session'],
    [new Date('Fri Mar 30 2018 13:00:00'),'Lunch'],
    [new Date('Fri Mar 30 2018 14:00:00'),'Hacking Time'],
    [new Date('Fri Mar 30 2018 16:30:00'),'Tea & snacks'],
    [new Date('Fri Mar 30 2018 17:00:00'),'Hack Time'],
    [new Date('Fri Mar 30 2018 19:00:00'),'First round of evaluation'],
    [new Date('Fri Mar 30 2018 20:30:00'),'Dinner'],
    [new Date('Fri Mar 30 2018 21:00:00'),'Hack Time'],
    [new Date('Fri Mar 30 2018 23:00:00'),'Mid night energy drink'],
    [new Date('Sat Mar 31 2018 00:00:00'),'Second round of training'],
    [new Date('Sat Mar 31 2018 1:00:00'),'Recreational Activity'],
    [new Date('Sat Mar 31 2018 1:30:00'),'Hacking Time'],
    [new Date('Sat Mar 31 2018 3:00:00'),'Snacks Time'],
    [new Date('Sat Mar 31 2018 6:00:00'),'Yoga session'],
    [new Date('Sat Mar 31 2018 6:30:00'),'Breakfast Time'],
    [new Date('Sat Mar 31 2018 9:00:00'),'Second round of evaluation'],
    [new Date('Sat Mar 31 2018 10:00:00'),'Tea and snacks'],
    [new Date('Sat Mar 31 2018 12:00:00'),'Power mentoring'],
    [new Date('Sat Mar 31 2018 12:45:00'),'Lunch'],
    [new Date('Sat Mar 31 2018 13:30:00'),'Hacking time'],
    [new Date('Sat Mar 31 2018 16:30:00'),'tea and snacks'],
    [new Date('Sat Mar 31 2018 18:00:00'),'Hackathon concluding']
]

var ptime = pTime.getTime();
var mainTiming = document.getElementById('main-timing');
var START = new Date('Fri Mar 30 2018 8:30:00');
var END = new Date('Sat Mar 31 2018 18:00:00');
var introText = document.getElementById('intro-text');
var timeLeft = document.getElementById('time-left');
var eventName = document.getElementById('event-name');
var timeUnits = document.getElementById('time-units');
var alert = document.getElementById('alert');
var foot = document.getElementById('foot');

function timer() {

    if(ptime < START.getTime()) {
        var netTime = START.getTime() - ptime + (1000 * 60);
        var hours = parseInt(netTime / (1000 * 60 * 60));
        var mints = parseInt(netTime / (1000 * 60)) - ( hours * 60 );
        var sec = parseInt(netTime / (1000 )) - ( hours * 60 * 60 ) - ( mints * 60 );
        mainTiming.innerHTML  = `${hours}:${mints}:${sec}`;
        ptime = ptime + 1000;
        introText.innerHTML='commencing '
    }
    else {
        var netTime = END.getTime() - ptime;
        var hours = parseInt(netTime / (1000 * 60 * 60));
        var mints = parseInt(netTime / (1000 * 60)) - ( hours * 60 );
        var sec = parseInt(netTime / (1000 )) - ( hours * 60 * 60 ) - ( mints * 60 );
        mainTiming.innerHTML  = `${hours}:${mints}:${sec}`;
        ptime = ptime + 1000;
        introText.innerHTML='concluding '
    }
}

var i=0;
function manageEvent() {

    if(i < SCHEDULE.length){
        console.log(parseInt((SCHEDULE[i+1][0].getTime()-ptime)/(1000 * 60)));
        if((SCHEDULE[i+1][0].getTime()-ptime)<=15*60*1000){
            i++;
        }
        if(((SCHEDULE[i][0].getTime()-ptime)>0)&&((SCHEDULE[i][0].getTime()-ptime)<=15*60*1000)){



            eventName.innerHTML = SCHEDULE[i][1];
            var eventTime = parseInt((SCHEDULE[i][0].getTime() - ptime + (1000 * 60))/(1000 * 60));
            timeLeft.innerHTML = `in ${eventTime}`;
            alert.innerHTML = 'Alert: ';
            timeUnits.innerHTML = 'minutes!';
        }else{
            eventName.innerHTML = SCHEDULE[i][1];
            timeLeft.innerHTML = ``;
            timeUnits.innerHTML = '';
            timeUnits.innerHTML = '';
            alert.innerHTML = '';
        }
    }
}

function main() {
    timer();
    manageEvent();
}

setInterval(main, 1000);