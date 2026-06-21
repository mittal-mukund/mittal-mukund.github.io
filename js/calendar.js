const googleLink =
"https://calendar.google.com/calendar/render?action=TEMPLATE"
+
"&text=Yashi+Weds+Mukund"
+
"&dates=20270126T123000Z/20270128T003000Z"
+
"&details=Wedding+Celebration"
+
"&location=Jashn+Wellness+Resort+Malihabad";

document.addEventListener(
"DOMContentLoaded",
()=>{

document.getElementById(
"googleCalendarBtn"
).href = googleLink;

});

function downloadICS(){

const content =
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Yashi Weds Mukund
LOCATION:Jashn Wellness Resort Malihabad
DESCRIPTION:#SHIfoUNDlove
DTSTART:20270126T123000Z
DTEND:20270128T003000Z
END:VEVENT
END:VCALENDAR`;

const blob =
new Blob(
[content],
{type:"text/calendar"}
);

const url =
URL.createObjectURL(blob);

const link =
document.createElement("a");

link.href = url;

link.download =
"Yashi-Mukund-Wedding.ics";

link.click();

}