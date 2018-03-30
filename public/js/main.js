var SCHEDULE = [
    [new Date('Fri Mar 30 2018 08:45:00'), 'Hacking begins'],
    [new Date('Fri Mar 30 2018 10:00:00'), 'Tea & snacks'],
    [new Date('Fri Mar 30 2018 11:30:00'), 'First Round of Training session'],
    [new Date('Fri Mar 30 2018 13:00:00'), 'Lunch'],
    [new Date('Fri Mar 30 2018 14:00:00'), 'Hacking Time'],
    [new Date('Fri Mar 30 2018 16:30:00'), 'Tea & snacks'],
    [new Date('Fri Mar 30 2018 17:00:00'), 'Hacking Time'],
    [new Date('Fri Mar 30 2018 18:00:00'), 'First Round of Evaluation'],
    [new Date('Fri Mar 30 2018 19:30:00'), 'Hacking Time'],
    [new Date('Fri Mar 30 2018 20:00:00'), 'Address by hon. P.M.'],
    [new Date('Fri Mar 30 2018 20:30:00'), 'Dinner'],
    [new Date('Fri Mar 30 2018 21:30:00'), 'Hacking Time'],
    [new Date('Fri Mar 31 2018 00:00:00'), 'Second Round of Training session'],
    [new Date('Fri Mar 31 2018 01:00:00'), 'Recreational Activity'],
    [new Date('Fri Mar 31 2018 01:30:00'), 'Hacking Time'],
    [new Date('Fri Mar 31 2018 06:00:00'), 'Yoga session'],
    [new Date('Fri Mar 31 2018 06:30:00'), 'Breakfast'],
    [new Date('Fri Mar 31 2018 07:30:00'), 'Hacking Time'],
    [new Date('Fri Mar 31 2018 09:00:00'), 'Second Round of Evaluation'],
    [new Date('Fri Mar 31 2018 10:30:00'), 'Hacking Time'],
    [new Date('Fri Mar 31 2018 12:00:00'), 'Power monitoring'],
    [new Date('Fri Mar 31 2018 12:45:00'), 'Lunch'],
    [new Date('Fri Mar 31 2018 13:30:00'), 'Hacking Time'],
    [new Date('Sat Mar 31 2018 15:00:00'), 'Hackathon concluding']
];

var ptime = pTime.getTime();
var mainTiming = document.getElementById('main-timing');
var START = SCHEDULE[0][0];
var END = SCHEDULE[SCHEDULE.length - 1][0];
var introText = document.getElementById('intro-text');
var timeLeft = document.getElementById('time-left');
var eventName = document.getElementById('event-name');
var timeUnits = document.getElementById('time-units');
var currentDate = document.getElementById('date');
var currentTime = document.getElementById('time');
var alert = document.getElementById('alert');
var foot = document.getElementById('foot');

function timer() {
    var cDate = new Date(ptime);
    var hr = cDate.getHours();
    var min = cDate.getMinutes();
    var amPM = (hr > 11) ? "PM" : "AM";
    if (hr > 12) {
        hr -= 12;
    } else if (hr == 0) {
        hr = "12";
    }
    if (min < 10) {
        min = "0" + min;
    }
    var date = cDate.toDateString().split(' ');
    currentTime.innerHTML = `${hr}:${min} ${amPM}`;
    currentDate.innerHTML = `${date[1]} ${date[2]}, ${date[3]}`;

    if(ptime < START.getTime()) {
        var netTime = START.getTime() - ptime;
        var hours = parseInt(netTime / (1000 * 60 * 60));
        var mints = parseInt(netTime / (1000 * 60)) - ( hours * 60 );
        var sec = parseInt(netTime / (1000 )) - ( hours * 60 * 60 ) - ( mints * 60 );
        mainTiming.innerHTML = `${(hours < 10) ? '0' + hours : hours}:${(mints < 10) ? '0' + mints : mints}:${(sec < 10) ? '0' + sec : sec}`;
        ptime = ptime + 1000;
        introText.innerHTML='commencing '
    }
    else {
        var netTime;
        if ((END.getTime() - ptime)>0) {
            netTime = END.getTime() - ptime;
        }
        else{
            netTime = 0;
        }
        var hours = parseInt(netTime / (1000 * 60 * 60));
        var mints = parseInt(netTime / (1000 * 60)) - ( hours * 60 );
        var sec = parseInt(netTime / (1000 )) - ( hours * 60 * 60 ) - ( mints * 60 );
        mainTiming.innerHTML = `${(hours < 10) ? '0' + hours : hours}:${(mints < 10) ? '0' + mints : mints}:${(sec < 10) ? '0' + sec : sec}`;
        ptime = ptime + 1000;
        introText.innerHTML='concluding '
    }
}

var i=0;
var notfs = 0;
function manageEvent() {
    if (ptime <= START.getTime() - 10*60*1000) {
        eventName.innerHTML = 'Hackathon commencing soon';
        timeLeft.innerHTML = '';
        timeUnits.innerHTML = '';
        timeUnits.innerHTML = '';
        alert.innerHTML = '';
    }
    else if(ptime > END.getTime())
    {
        eventName.innerHTML = 'Hackathon concludes';
        timeLeft.innerHTML = '';
        timeUnits.innerHTML = '';
        timeUnits.innerHTML = '';
        alert.innerHTML = '';
    }
    else{
        if (i < SCHEDULE.length) {
            if(((SCHEDULE[i + 1][0].getTime() - ptime) < 10 * 60 * 1000)) {
                i++;
            }
            if (((SCHEDULE[i][0].getTime() - ptime) >= 0) && ((SCHEDULE[i][0].getTime() - ptime) <= 10 * 60 * 1000)) {
                if (notfs == 0) {
                    document.getElementById('foot').style.background = '#F69324';
                    notfs++;
                }
                eventName.innerHTML = SCHEDULE[i][1];
                var eventTime = parseInt((SCHEDULE[i][0].getTime() - ptime + (1000 * 60)) / (1000 * 60));
                timeLeft.innerHTML = `in ${eventTime}`;
                alert.innerHTML = 'Alert: ';
                if (eventTime <= 1) {
                    timeUnits.innerHTML = 'minute !';
                } else {
                    timeUnits.innerHTML = 'minutes !';
                }
            } else {
                if (notfs > 0) {
                    document.getElementById('foot').style.background = '#76B042';
                    notfs = 0
                }
                eventName.innerHTML = SCHEDULE[i][1];
                timeLeft.innerHTML = '';
                timeUnits.innerHTML = '';
                timeUnits.innerHTML = '';
                alert.innerHTML = '';
            }
        }

    }

}

function main() {
    timer();
    manageEvent();
}

setInterval(main, 1000);

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function () {
        var newDate = new Date();
        ptime = newDate.getTime();
    }, 2000);

});

