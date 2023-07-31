let weekday=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
let monthName=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
let date=new Date();
let dateA=date.toLocaleDateString("de-De");
let dateB=date.toLocaleDateString("de-De");
let dateC=date.toLocaleDateString("de-De");
let year=new Date().getFullYear();
let month=monthName[date.getMonth()];
let day=weekday[date.getDay()];
let daylist=new Date().getDate();
function getWeekOfMonth(date) {
    let adjustedDate = date.getDate()+ date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}
//document.querySelectorAll('p').innerHTML='hallo'
document.getElementById("infotext_year").innerHTML=year;
document.getElementById("dateDa").innerHTML=dateA;
document.getElementById("dateDb").innerHTML=dateB;
document.getElementById("dateDc").innerHTML=dateC;
document.getElementById("weekdayD").innerHTML=day;
document.getElementById("weekdayDa").innerHTML=day;
document.getElementById("weekInMonth").innerHTML=(getWeekOfMonth(date));
document.getElementById("monthID").innerHTML=month;
document.getElementById("lustig").innerHTML=daylist;
document.getElementById("unlustig").innerHTML=month;
//document.getElementById("holidayYesNoD").innerHTML=
