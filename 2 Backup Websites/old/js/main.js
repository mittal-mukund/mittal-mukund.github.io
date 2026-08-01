const music =
document.getElementById(
'bg-music'
);

const toggle =
document.getElementById(
'music-toggle'
);

let playing=false;

toggle.addEventListener(
'click',
()=>{

if(!playing){

music.play();

playing=true;

toggle.innerHTML='❚❚';

}else{

music.pause();

playing=false;

toggle.innerHTML='♫';

}

}
);

//PETALS

const petalsContainer =
document.getElementById(
'petals-container'
);

function createPetal(){

const petal =
document.createElement('span');

petal.classList.add(
'petal'
);

petal.innerHTML='🌸';

petal.style.left =
Math.random()*100 + 'vw';

petal.style.animationDuration =
8 + Math.random()*8 + 's';

petal.style.fontSize =
20 + Math.random()*25 + 'px';

petalsContainer.appendChild(
petal
);

setTimeout(
()=>{
petal.remove();
},
16000
);

}

setInterval(
createPetal,
600
);

async function shareInvite(){

if(navigator.share){

await navigator.share({

title:
"Yashi ❤️ Mukund",

text:
"Join us for #SHIfoUNDlove",

url:
window.location.href

});

}
else{

navigator.clipboard.writeText(
window.location.href
);

alert(
"Invitation link copied."
);

}

}

//Mobile Functionality

const mobileMenu =
document.querySelector(
".mobile-menu"
);

const navLinks =
document.querySelector(
".nav-links"
);

mobileMenu.addEventListener(
"click",
()=>{

navLinks.classList.toggle(
"mobile-active"
);

});