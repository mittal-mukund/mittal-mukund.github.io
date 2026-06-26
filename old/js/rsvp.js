const whatsappNumber =
"917755063467";

function acceptInvite(){

const name =
document.getElementById(
"guestName"
).value;

const count =
document.getElementById(
"guestCount"
).value;

const message =
`Hello Mukund & Yashi,

I am delighted to attend your wedding.

Name: ${name}

Guests: ${count}

Looking forward to celebrating with you.`;

window.open(
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
"_blank"
);

}

function declineInvite(){

const name =
document.getElementById(
"guestName"
).value;

const message =
`Hello Mukund & Yashi,

Unfortunately I will not be able to attend.

Name: ${name}

Wishing you both a wonderful married life.`;

window.open(
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
"_blank"
);

}