let weekday=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
let monthName=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
let date = new Date(2023,3,7);
let dateA=date.toLocaleDateString("de-De");
let dateB=date.toLocaleDateString("de-De");
let dateC=date.toLocaleDateString("de-De");
let year=new Date().getFullYear();
let month=monthName[date.getMonth()];
let day=weekday[date.getDay()];
let daylist=new Date().getDate();

/*the following function calculates wich weekday of the month it is (the 1st, 2nd ,3rd Tuesday for example)*/
function getWeekOfMonth(date) {
    let adjustedDate = date.getDate()+ date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}
/*the following function determines the date of easter, provided by stephan*/
function getEasterSunday(year) {
    const a = year % 19;
    const b = year % 4;
    const c = year % 7;
    const k = Math.floor(year / 100);
    const p = Math.floor((13 + 8 * k) / 25);
    const q = Math.floor(k / 4);
    const M = (15 - p + k - q) % 30;
    const N = (4 + k - q) % 7;
    const d = (19 * a + M) % 30;
    const e = (2 * b + 4 * c + 6 * d + N) % 7;
    
    let day;
    let month;
    
    if (d + e > 9) {
        day = d + e - 9;
        month = 4; // April
    } else {
        day = d + e + 22;
        month = 3; // March
    }

    let easterSundayDate = new Date(year, month - 1, day);
        return easterSundayDate;
}
/*the following function calculates the date of good friday based on the first day of easter*/
function karfreitag(){
let kar=getEasterSunday(year);
kar.setDate(kar.getDate()-2);
}
/*the following function calculates the second day of easter based on the first day of easter*/

/*the following function calculates ascension day based on the first day of easter*/
/*the following function calculates the first day of pentecoast based on the first day of easter*/
/*the following function calculates the second day of pentecoast based on the first day of easter*/
/*the following function calculates the feast of corpus christi based on the first day of easter*/

/*public holiday calculation*/
function holidays(){
    let  d=  new Date(2023,3,7);
    let year = d.getFullYear();
    let listholidays=[
        dayOfWork =     new Date(year,4,1),     //fix date: workers' day
        newYear =       new Date(year,0,1),     //fix date: new year
        unity =         new Date(year,9,3),     //fix date: german unity day
        christmas =     new Date(year,11,25),   //fix date: christmas
        christmas2 =    new Date(year,11,26),   //fix date: second day of christmas
        goodFriday =    karfreitag(year),     //good friday easter-2
        easter2 =       new Date(year,3,10),    //second day of easter easter+1
        ascension =     new Date(year,4,18),    //ascension day easter+39
        pentecoast =    new Date(year,4,28),    //first day of pentecoast easter+49
        pentecoast2 =   new Date(year,4,29),    //second day of pentecoast easter +50
        corpusChristi = new Date(year,5,8),     //corpus christi easter+60
        easter =        getEasterSunday(year),  //easter date determined by function getEasterSunday
    ];
    for (var i = 0; i < listholidays.length; i++){
        if (d.getTime() == listholidays[i].getTime()){
            return document.getElementById("holidayYesNo").innerHTML="um";
         }
         document.getElementById("holidayYesNo").innerHTML="nicht um";
         
    }      
};

/*replacement texts*/
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
holidays();
