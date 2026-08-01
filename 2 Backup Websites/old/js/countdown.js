const weddingDate =
new Date(
"January 26, 2027 18:00:00"
);

function updateCountdown(){

const now =
new Date();

const difference =
weddingDate - now;

const days =
Math.floor(
difference /
(1000*60*60*24)
);

const hours =
Math.floor(
(difference %
(1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(difference %
(1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(difference %
(1000*60))
/
1000
);

document.getElementById(
"days"
).innerHTML = days;

document.getElementById(
"hours"
).innerHTML = hours;

document.getElementById(
"minutes"
).innerHTML = minutes;

document.getElementById(
"seconds"
).innerHTML = seconds;

}

updateCountdown();

setInterval(
updateCountdown,
1000
);