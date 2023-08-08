window.onload= function(){
    main();
};

function main(){
    let weekday=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
    let monthName=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let date = new Date();                  //base date for most infotext changes | adjust () for testing or () remains empty for current date
    let dateA=date.toLocaleDateString("de-De");
    let dateB=date.toLocaleDateString("de-De");
    let dateC=date.toLocaleDateString("de-De");
    let year=new Date().getFullYear();
    let month=monthName[date.getMonth()];
    let day=weekday[date.getDay()];
    let daylist=new Date().getDate();
    let html=getCalendarTableCaption(date)/*+getCalendarTableHead()+getCalendarTableBody()*/;
    document.getElementById("infotext_year").innerHTML=(date.getFullYear());
    document.getElementById("dateDa").innerHTML=dateA;
    document.getElementById("dateDb").innerHTML=dateB;
    document.getElementById("dateDc").innerHTML=dateC;
    document.getElementById("weekdayD").innerHTML=day;
    document.getElementById("weekdayDa").innerHTML=day;
    document.getElementById("monthID").innerHTML=month;
    document.getElementById("lustig").innerHTML=(date.getDate())+"."+month;
    document.getElementById("calendarTableCaption").innerHTML=html;
    
    getWeekOfMonth();
    holidays();
    lastHoliday();
};
/*Kalender aus html übernommen| noch nicht dynamisiert*/
function getCalendarTableCaption(date){
    let html =  `<table class="kalender">`;
    html +=     `<caption colspan="8">`;
    html +=     `<div id="monatheader">`;
    html +=     `<div class="left">`;
    html +=     getMonthGerman(date.getMonth());
    html +=     `</div>`;
    html +=     `<div class="right">2027</div>`;
    html +=     `</caption>`;
    html +=     `<thead>`;
    html +=     `<tr>`;
    html +=     `<div id="tage">`;
    html +=     `<th class="kw"><abbr title="Kalenderwoche">KW</abbr></th>`;
    html +=     `<th class="wochentag"><abbr title="Montag">MO</abbr></th>`;
    html +=     `<th class="wochentag"><abbr title="Dienstag">DI</abbr></th>`;
    html +=     `<th class="wochentag"><abbr title="Mittwoch">MI</abbr></th>`;
    html +=     `<th class="wochentag"><abbr title="Donnerstag">DO</abbr></th>`;
    html +=     `<th class="wochentag"><abbr title="Freitag">FR</abbr></th>`;
    html +=     `<th class="samstag"><abbr title="Samstag">SA</abbr></th>`;
    html +=     `<th class="sonntag"><abbr title="Sonntag">SO</abbr></th>`;
    html +=     `</div>`;
    html +=     `</tr>`;
    html +=     `</thead>`;
    html +=     `<tr>`;
    html +=     `<td class="kwdate">9</td>`;
    html +=     `<td class="nichtmärz">28</td>`;
    html +=     `<td class="datum">1</td>`;
    html +=     `<td class="datum">2</td>`;
    html +=     `<td class="datum">3</td>`;
    html +=     `<td class="datum">4</td>`;
    html +=     `<td class="datumsa">5</td>`;
    html +=     `<td class="datumso">6</td>`;
    html +=     `</tr>`;
    html +=     `<tr>`;
    html +=     `<td class="kwdate">10</td>`;
    html +=     `<td class="datum">7</td>`;
    html +=     `<td class="datum">8</td>`;
    html +=     `<td class="datum">9</td>`;
    html +=     `<td class="datum">10</td>`;
    html +=     `<td class="datum">11</td>`;
    html +=     `<td class="datumsa">12</td>`;
    html +=     `<td class="datumso">13</td>`;
    html +=     `</tr>`;
    html +=     `<tr>`;
    html +=     `<td class="kwdate">11</td>`;
    html +=     `<td class="datum">14</td>`;
    html +=     `<td class="datum">15</td>`;
    html +=     `<td class="datum">16</td>`;
    html +=     `<td class="datum auswahl">17</td>`;
    html +=     `<td class="datum">18</td>`;
    html +=     `<td class="datumsa">19</td>`;
    html +=     `<td class="datumso">20</td>`;
    html +=     `</tr>`;
    html +=     `<tr>`;
    html +=     `<td class="kwdate">12</td>`;
    html +=     `<td class="datum">21</td>`;
    html +=     `<td class="datum">22</td>`;
    html +=     `<td class="datum">23</td>`;
    html +=     `<td class="datum">24</td>`;
    html +=     `<td class="datum">25</td>`;
    html +=     `<td class="datumsa">26</td>`;
    html +=     `<td class="datumso">27</td>`;
    html +=     `</tr>`;
    html +=     `<tr>`;
    html +=     `<td class="kwdate">13</td>`;
    html +=     `<td class="datum">28</td>`;
    html +=     `<td class="datum">29</td>`;
    html +=     `<td class="datum">30</td>`;
    html +=     `<td class="datum">31</td>`;
    html +=     `<td class="nichtmärz">1</td>`;
    html +=     `<td class="nichtmärz">2</td>`;
    html +=     `<td class="nichtmärz">3</td>`;
    html +=     `</tr>`;
    html +=     `</table>`;
    return html;
}

function getMonthGerman(month){
    let monthName=["Januar","Februar","März","April","Mai","Juni","Juli",
                    "August","September","Oktober","November","Dezember"];
    return monthName[month];
}

/*the following function determines if 
the day of the week is the 1st, 2nd, 3rd, 4th or 5th of its kind in this month*/
function getWeekOfMonth() {
    let date = new Date();
    if(date.getDate() <= 7) {
        document.getElementById("weekInMonth").innerHTML="erste";
    }
    else if(date.getDate() <= 14) {
        document.getElementById("weekInMonth").innerHTML="zweite";
    }
    else if(date.getDate() <= 12) {
        document.getElementById("weekInMonth").innerHTML="dritte";
    }
    else if(date.getDate() <= 28) {
        document.getElementById("weekInMonth").innerHTML="vierte";
    }
    else if(date.getDate() > 28) {
        document.getElementById("weekInMonth").innerHTML="fünfte";
    }
    else document.getElementById("weekInMonth").innerHTML="unbekannte";
};

/*the following function determines the date of easter;
provided by stefan | quote: "no idea how it works, but it works" | neither do i*/
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
};

/*public holiday calculation*/
function holidays(){
    let date = new Date();
    let year = date.getFullYear();
    easter =        getEasterSunday(year);  //easter date determined by function getEasterSunday
    let listholidays=[
        newYear =       new Date(year,0,1),     //fix date: new year
        easter =        easter,
        easter2 =       new Date(year,easter.getMonth(),easter.getDate()+1),    //second day of easter easter+1
        goodFriday =    new Date(year,easter.getMonth(),easter.getDate()-2),    //good friday easter-2
        dayOfWork =     new Date(year,4,1),                                     //fix date: workers' day
        ascension =     new Date(year,easter.getMonth(),easter.getDate()+39),   //ascension day easter+39
        pentecoast =    new Date(year,easter.getMonth(),easter.getDate()+49),   //first day of pentecoast easter+49
        pentecoast2 =   new Date(year,easter.getMonth(),easter.getDate()+50),   //second day of pentecoast easter +50
        corpusChristi = new Date(year,easter.getMonth(),easter.getDate()+60),   //corpus christi easter+60
        unity =         new Date(year,9,3),     //fix date: german unity day
        christmas =     new Date(year,11,25),   //fix date: christmas
        christmas2 =    new Date(year,11,26),   //fix date: second day of christmas
        
    ];
    for (var i = 0; i < listholidays.length; i++){
        if (date.getTime() == listholidays[i].getTime()){
            return document.getElementById("holidayYesNo").innerHTML="um";}
        else {document.getElementById("holidayYesNo").innerHTML="nicht um"}
        }
             
};

/*function determines which holiday accurs before and after the current date */
function lastHoliday() {
    let date = new Date();
    let christmasPrev= new Date(date.getFullYear()-1,11,26);
    let newYearNxt = new Date(date.getFullYear()+1,0,1); 
    if(date.getTime() == newYear.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(christmasPrev.toLocaleDateString())+" (Zweiter Weihnachtsfeiertag)";
    document.getElementById("nextHoliday").innerHTML=(goodFriday.toLocaleDateString())+" (Karfreitag)";
    return;
    }
    else if(date.getTime() < goodFriday.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(newYear.toLocaleDateString())+" (Neujahr)";
    document.getElementById("nextHoliday").innerHTML=(goodFriday.toLocaleDateString())+" (Karfreitag)";
    return;       
    }
    else if(date.getTime() == goodFriday.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(newYear.toLocaleDateString())+" (Neujahr)";
    document.getElementById("nextHoliday").innerHTML=(easter.toLocaleDateString())+" (Ostersonntag)";
    return;       
    }
    else if(date.getTime() < easter.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(goodFriday.toLocaleDateString())+"(Karfreitag)";
    document.getElementById("nextHoliday").innerHTML=(easter.toLocaleDateString())+" (Ostersonntag)";
    return;
    }
    else if(date.getTime() == easter.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(goodFriday.toLocaleDateString())+" (Karfreitag)";
    document.getElementById("nextHoliday").innerHTML=(easter2.toLocaleDateString())+" (Ostermontag)";
    return;
    }
    else if(date.getTime() == easter2.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(easter.toLocaleDateString())+" (Ostersonntag)";
    document.getElementById("nextHoliday").innerHTML=(dayOfWork.toLocaleDateString())+" (Tag der Arbeit)";
    return;
    }
    else if(date.getTime() < dayOfWork.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(easter2.toLocaleDateString())+" (Ostermontag)";
    document.getElementById("nextHoliday").innerHTML=(dayOfWork.toLocaleDateString())+" (Tag der Arbeit)";
    return;
    }
    else if(date.getTime() == dayOfWork.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(easter2.toLocaleDateString())+" (Ostermontag)";
    document.getElementById("nextHoliday").innerHTML=(ascension.toLocaleDateString())+" (Christi Himmelfahrt)";
    return;
    }
    else if(date.getTime() < ascension.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(dayOfWork.toLocaleDateString())+" (Tag der Arbeit)";
    document.getElementById("nextHoliday").innerHTML=(ascension.toLocaleDateString())+" (Christi Himmelfahrt)";
    return;
    }
    else if(date.getTime() == ascension.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(dayOfWork.toLocaleDateString())+" (Tag der Arbeit)";
    document.getElementById("nextHoliday").innerHTML=(pentecoast.toLocaleDateString())+" (Pfingstsonntag)";
    return;
    }
    else if(date.getTime() < pentecoast.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(ascension.toLocaleDateString())+" (Christi Himmelfahrt)";
    document.getElementById("nextHoliday").innerHTML=(pentecoast.toLocaleDateString())+" (Pfingstsonntag)";
    return;
    }
    else if(date.getTime() == pentecoast.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(ascension.toLocaleDateString())+" (Christi Himmelfahrt)";
    document.getElementById("nextHoliday").innerHTML=(pentecoast2.toLocaleDateString())+" (Pfingstmontag)";
    return;
    }
    else if(date.getTime() == pentecoast2.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(pentecoast.toLocaleDateString())+" (Pfingstsonntag)";
    document.getElementById("nextHoliday").innerHTML=(corpusChristi.toLocaleDateString())+" (Fronleichnam)";
    return;
    }
    else if(date.getTime() < corpusChristi.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(pentecoast2.toLocaleDateString())+" (Pfingstmontag)";
    document.getElementById("nextHoliday").innerHTML=(corpusChristi.toLocaleDateString())+" (Fronleichnam)";
    return;
    }
    else if(date.getTime() == corpusChristi.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(pentecoast2.toLocaleDateString())+" (Pfingstmontag)";
    document.getElementById("nextHoliday").innerHTML=(unity.toLocaleDateString())+" (Tag der Deutschen Einheit)";
    return;
    }
    else if(date.getTime() < unity.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(corpusChristi.toLocaleDateString())+" (Fronleichnam)";
    document.getElementById("nextHoliday").innerHTML=(unity.toLocaleDateString())+" (Tag der Deutschen Einheit)";
    return;
    }
    else if(date.getTime() == unity.getTime()) {
    document.getElementById("lastHoliday").innerHTML=(corpusChristi.toLocaleDateString())+" (Fronleichnam)";
    document.getElementById("nextHoliday").innerHTML=(christmas.toLocaleDateString())+" (Erster Weihnachtsfeiertag)";
    return;
    }
    else if(date.getTime() < christmas.getTime()) {
        document.getElementById("lastHoliday").innerHTML=(unity.toLocaleDateString())+" (Tag der Deutschen Einheit)";
        document.getElementById("nextHoliday").innerHTML=(christmas.toLocaleDateString())+" (Erster Weihnachtsfeiertag)";
        return;
    }
    else if(date.getTime() == christmas.getTime()) {
        document.getElementById("lastHoliday").innerHTML=(unity.toLocaleDateString())+" (Tag der Deutschen Einheit)";
        document.getElementById("nextHoliday").innerHTML=(christmas2.toLocaleDateString())+" (Zweiter Weihnachtsfeiertag)";
        return;
    }
    else if(date.getTime() == christmas2.getTime()) {
        document.getElementById("lastHoliday").innerHTML=(christmas.toLocaleDateString())+" (Erster Weihnachtsfeiertag)";
        document.getElementById("nextHoliday").innerHTML=(newYearNxt.toLocaleDateString())+" (Neujahr)";
        return;
    }
    else if(date.getTime() > christmas2.getTime()) {
        document.getElementById("lastHoliday").innerHTML=(christmas2.toLocaleDateString())+" (Zweiter Weihnachtsfeiertag)";
        document.getElementById("nextHoliday").innerHTML=(newYearNxt.toLocaleDateString())+" (Neujahr)";
        return;
    }
    document.getElementById("lastHoliday").innerHTML="LANGWEILIGSTE";
}