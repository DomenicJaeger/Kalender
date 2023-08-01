

let weekday=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
let monthName=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
let date = new Date();
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
/*public holiday calculation*/
function holidays(){
    let  d=  new Date();
    let year = d.getFullYear();
    let listholidays=[
        newYear =       new Date(year,0,1),     //fix date: new year
        dayOfWork =     new Date(year,4,1),     //fix date: workers' day
        unity =         new Date(year,9,3),     //fix date: german unity day
        christmas =     new Date(year,11,25),   //fix date: christmas
        christmas2 =    new Date(year,11,26),   //fix date: second day of christmas
    ];
    for (var i = 0; i < listholidays.length; i++){
        if (d.getTime() == listholidays[i].getTime()){
            document.getElementById("holidayYesNoD").innerHTML="1";
            return;
         }
        document.getElementById("holidayYesNoD").innerHTML="nicht";
         
    }      
}
console.log(holidays)
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
//solve this next
//document.getElementById("holidayYesNoD").innerHTML=

/*Feiertage in Hessen
    1. Januar Neujahr fix
    Karfreitag variabel [Ostersonntag - 1]
    |||
    Ostersonntag variabel [Pivot]
    Formel um Ostersonntag zu berechnen, von Stephan übernommen
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
        
        // Das Datum als neues Date-Objekt erstellen und zurückgeben
        let easterSundayDate = new Date(year, month - 1, day);
        return easterSundayDate;
    }
    |||
    Ostermontag variabel [Ostersonntag + 1]
    1. Mai Tag der Arbeit fix
    Christi Himmelfahrt variabel [Ostersonntag + 39]
    Pfingssonntag variabel [Ostersonntag + 49]
    Pfingstmontag variabel [Ostersonntag + 50]
    Fronleichnam variabel [Ostersonntag + 60]
    3. Oktober Tag d.d. Einheit fix
    25. Dezember 1. Weihnachtstag fix
    26. Dezember 2. Weihnachtstag fix
*/
