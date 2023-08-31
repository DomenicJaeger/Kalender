window.onload = function () {
    changeTime(new Date());
}

function changeTime(newDate) {
    let weekday = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    let monthName = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let date = new Date(newDate);
    let dateA = date.toLocaleDateString("de-De");
    let dateB = date.toLocaleDateString("de-De");
    let dateC = date.toLocaleDateString("de-De");
    let year = new Date().getFullYear();
    let month = monthName[date.getMonth()];
    let day = weekday[date.getDay()];
    let daylist = new Date().getDate();
    let html = getCalendarTableCaption(date);

    //text der in html ersetzt wird
    document.getElementById("infotext_year").innerHTML = (date.getFullYear());
    document.getElementById("dateDa").innerHTML = dateA;
    document.getElementById("dateDb").innerHTML = dateB;
    document.getElementById("dateDc").innerHTML = dateC;
    document.getElementById("weekdayD").innerHTML = day;
    document.getElementById("weekdayDa").innerHTML = day;
    document.getElementById("monthID").innerHTML = month;
    document.getElementById("lustig").innerHTML = (date.getDate()) + "." + month;
    //kalenderblatt wird gezeichnet
    document.getElementById("calendarTableCaption").innerHTML = html;

    getWeekOfMonth(date);
    holidays(date);
    lastHoliday(date);
};
//Kalenderblatt
function getCalendarTableCaption(date) {
    //Inhalt ändert sich nur an zwei stellen
    let html =  `<table class="kalender">`;
    html +=         `<button onclick="changeTime(${new Date(date.getFullYear(),date.getMonth()-1,1).getTime()})">Vorheriger Monat</button>`;
    html +=         `<button onclick="changeTime(${new Date(date.getFullYear(),date.getMonth()+1,1).getTime()})">Nächster Monat</button>`;
    html +=         `<caption colspan="8">`;
    html +=             `<div id="monatheader">`;
    html +=                 `<div class="left">`;
    html +=                     getMonthGerman(date.getMonth());
    html +=                 `</div>`;
    html +=                 `<div class="right">`;
    html +=                     date.getFullYear();
    html +=                 `</div>`;
    html +=             `</div>`;
    html +=         `</caption>`;
    html +=         `<thead>`;
    html +=             `<tr>`;
    html +=                 `<div id="tage">`;
    html +=                     `<th class="wochentag"><abbr title="Montag">MO</abbr></th>`;
    html +=                     `<th class="wochentag"><abbr title="Dienstag">DI</abbr></th>`;
    html +=                     `<th class="wochentag"><abbr title="Mittwoch">MI</abbr></th>`;
    html +=                     `<th class="wochentag"><abbr title="Donnerstag">DO</abbr></th>`;
    html +=                     `<th class="wochentag"><abbr title="Freitag">FR</abbr></th>`;
    html +=                     `<th class="samstag"><abbr title="Samstag">SA</abbr></th>`;
    html +=                     `<th class="sonntag"><abbr title="Sonntag">SO</abbr></th>`;
    html +=                 `</div>`;
    html +=             `</tr>`;
    html +=         `</thead>`;

    //erster Tag des Monats
    let dayone = new Date(date.getFullYear(),date.getMonth(),1).getDay();
    if (dayone==0) {
        dayone = 7;
    }

    //letztes Datum des Monats
    let lastdate = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();

    //Tag des letzten Datums des Monats
    let dayend = new Date(date.getFullYear(),date.getMonth(),lastdate).getDay();
    if (dayend==0) {
        dayend = 7;
    }

    //letztes Datum des vorherigen Monats
    let monthlastdate = new Date(date.getFullYear(),date.getMonth(),0).getDate();

    //Schleife Tage des Vormonats
    for (let i=dayone; i>1;i--) {
        html += `<td>${monthlastdate-i+2}</td>`;
    }
    //Schleife Tage dieses Monats
    for (let i=1;i<=lastdate;i++) {
        let currentDay = new Date(date.getFullYear(), date.getMonth(), i);
        //für grafische änderungen im css
        //let classAttribute = "";
        if(currentDay.getDay() == 1) {
            html += `<tr>`;
        }
        /*
        //für grafische änderungen im css
        //check day and add class attribute
        //if today
        if (currentDay.getTime() == new Date()) {
            classAttribute = "today";
        }
        //if sunday
        if (currentDay.getDay() == 0) {
            classAttribute = "sunday";
        }
        //if saturday
        if (currentDay.getDay() ==6) {
            classAttribute = "saturday";
        }
        //if holiday
        if (checkHoliday(day)!=null) {
            classAttribute = "holiday";
        }*/
        
        html += `<td class="calendarDay" onclick="changeTime(${new Date(date.getFullYear(),date.getMonth(),i).getTime()})">`;
        html += i;
        html += `</td>`;
        if (currentDay.getDate() == 0) {
            html += `</tr>`;
        }
    }
    //Schleife Tage des nächsten Monats
    for (let i=dayend;i<7;i++) {
        html += `<td>${i-dayend+1}</td>`;
    }
    html += `</table>`;
    return html;
}

//monatsname auf deutsch ermitteln
function getMonthGerman(month) {
    let monthName = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
        "August", "September", "Oktober", "November", "Dezember"];
    return monthName[month];
}

/*der wievielte Montag, Dienstag usw. des Monats*/
function getWeekOfMonth(date) {
    if (date.getDate() <= 7) {
        document.getElementById("weekInMonth").innerHTML = "erste";
    }
    else if (date.getDate() <= 14) {
        document.getElementById("weekInMonth").innerHTML = "zweite";
    }
    else if (date.getDate() <= 21) {
        document.getElementById("weekInMonth").innerHTML = "dritte";
    }
    else if (date.getDate() <= 28) {
        document.getElementById("weekInMonth").innerHTML = "vierte";
    }
    else if (date.getDate() > 28) {
        document.getElementById("weekInMonth").innerHTML = "fünfte";
    }
    else document.getElementById("weekInMonth").innerHTML = "unbekannte";
};

/*Osterberrechnung*/
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

/*Feiertage*/
function holidays(date) {
    //let date = new Date();
    let year = date.getFullYear();
    easter = getEasterSunday(year);  //Ostersonntag
    let listholidays = [
        newYear = new Date(year, 0, 1),     //fixes Datum Neujahr
        easter = easter,
        easter2 = new Date(year, easter.getMonth(), easter.getDate() + 1),    //Ostermontag Ostern+1
        goodFriday = new Date(year, easter.getMonth(), easter.getDate() - 2),    //Karfreitag Ostern-2
        dayOfWork = new Date(year, 4, 1),                                     //fixes datum tag der arbeit
        ascension = new Date(year, easter.getMonth(), easter.getDate() + 39),   //christi himmelfahrt ostern+39
        pentecoast = new Date(year, easter.getMonth(), easter.getDate() + 49),   //erster pfingsttag ostern+49
        pentecoast2 = new Date(year, easter.getMonth(), easter.getDate() + 50),   //zweiter pfingsttag ostern +50
        corpusChristi = new Date(year, easter.getMonth(), easter.getDate() + 60),   //fronleichnam ostern+60
        unity = new Date(year, 9, 3),     //fixes datum tag der deutschen einheit
        christmas = new Date(year, 11, 25),   //fixes datum erster weihnachtsfeiertag
        christmas2 = new Date(year, 11, 26),   //fixes datum zweiter weihnachtsfeiertag

    ];
    console.log(date)
    //ist aktueller tag ein feiertag ja nein
    for (var i = 0; i < listholidays.length; i++) {
        if (date.getTime() == listholidays[i].getTime()) {
            return document.getElementById("holidayYesNo").innerHTML = "um";
        }
        else { document.getElementById("holidayYesNo").innerHTML = "nicht um" }
    }

};

/*welcher feiertag kommt vor und nach dem aktuellen datum | funktioniert nicht mehr richtig statt des ausgewählten wird nur das aktuelle datum verwendet*/
function lastHoliday(date) {
    //let date = new Date();
    let christmasPrev = new Date(date.getFullYear() - 1, 11, 26);
    let newYearNxt = new Date(date.getFullYear() + 1, 0, 1);
    if (date.getTime() == newYear.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (christmasPrev.toLocaleDateString()) + " (Zweiter Weihnachtsfeiertag)";
        document.getElementById("nextHoliday").innerHTML = (goodFriday.toLocaleDateString()) + " (Karfreitag)";
        return;
    }
    else if (date.getTime() < goodFriday.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (newYear.toLocaleDateString()) + " (Neujahr)";
        document.getElementById("nextHoliday").innerHTML = (goodFriday.toLocaleDateString()) + " (Karfreitag)";
        return;
    }
    else if (date.getTime() == goodFriday.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (newYear.toLocaleDateString()) + " (Neujahr)";
        document.getElementById("nextHoliday").innerHTML = (easter.toLocaleDateString()) + " (Ostersonntag)";
        return;
    }
    else if (date.getTime() < easter.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (goodFriday.toLocaleDateString()) + "(Karfreitag)";
        document.getElementById("nextHoliday").innerHTML = (easter.toLocaleDateString()) + " (Ostersonntag)";
        return;
    }
    else if (date.getTime() == easter.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (goodFriday.toLocaleDateString()) + " (Karfreitag)";
        document.getElementById("nextHoliday").innerHTML = (easter2.toLocaleDateString()) + " (Ostermontag)";
        return;
    }
    else if (date.getTime() == easter2.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (easter.toLocaleDateString()) + " (Ostersonntag)";
        document.getElementById("nextHoliday").innerHTML = (dayOfWork.toLocaleDateString()) + " (Tag der Arbeit)";
        return;
    }
    else if (date.getTime() < dayOfWork.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (easter2.toLocaleDateString()) + " (Ostermontag)";
        document.getElementById("nextHoliday").innerHTML = (dayOfWork.toLocaleDateString()) + " (Tag der Arbeit)";
        return;
    }
    else if (date.getTime() == dayOfWork.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (easter2.toLocaleDateString()) + " (Ostermontag)";
        document.getElementById("nextHoliday").innerHTML = (ascension.toLocaleDateString()) + " (Christi Himmelfahrt)";
        return;
    }
    else if (date.getTime() < ascension.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (dayOfWork.toLocaleDateString()) + " (Tag der Arbeit)";
        document.getElementById("nextHoliday").innerHTML = (ascension.toLocaleDateString()) + " (Christi Himmelfahrt)";
        return;
    }
    else if (date.getTime() == ascension.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (dayOfWork.toLocaleDateString()) + " (Tag der Arbeit)";
        document.getElementById("nextHoliday").innerHTML = (pentecoast.toLocaleDateString()) + " (Pfingstsonntag)";
        return;
    }
    else if (date.getTime() < pentecoast.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (ascension.toLocaleDateString()) + " (Christi Himmelfahrt)";
        document.getElementById("nextHoliday").innerHTML = (pentecoast.toLocaleDateString()) + " (Pfingstsonntag)";
        return;
    }
    else if (date.getTime() == pentecoast.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (ascension.toLocaleDateString()) + " (Christi Himmelfahrt)";
        document.getElementById("nextHoliday").innerHTML = (pentecoast2.toLocaleDateString()) + " (Pfingstmontag)";
        return;
    }
    else if (date.getTime() == pentecoast2.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (pentecoast.toLocaleDateString()) + " (Pfingstsonntag)";
        document.getElementById("nextHoliday").innerHTML = (corpusChristi.toLocaleDateString()) + " (Fronleichnam)";
        return;
    }
    else if (date.getTime() < corpusChristi.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (pentecoast2.toLocaleDateString()) + " (Pfingstmontag)";
        document.getElementById("nextHoliday").innerHTML = (corpusChristi.toLocaleDateString()) + " (Fronleichnam)";
        return;
    }
    else if (date.getTime() == corpusChristi.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (pentecoast2.toLocaleDateString()) + " (Pfingstmontag)";
        document.getElementById("nextHoliday").innerHTML = (unity.toLocaleDateString()) + " (Tag der Deutschen Einheit)";
        return;
    }
    else if (date.getTime() < unity.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (corpusChristi.toLocaleDateString()) + " (Fronleichnam)";
        document.getElementById("nextHoliday").innerHTML = (unity.toLocaleDateString()) + " (Tag der Deutschen Einheit)";
        return;
    }
    else if (date.getTime() == unity.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (corpusChristi.toLocaleDateString()) + " (Fronleichnam)";
        document.getElementById("nextHoliday").innerHTML = (christmas.toLocaleDateString()) + " (Erster Weihnachtsfeiertag)";
        return;
    }
    else if (date.getTime() < christmas.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (unity.toLocaleDateString()) + " (Tag der Deutschen Einheit)";
        document.getElementById("nextHoliday").innerHTML = (christmas.toLocaleDateString()) + " (Erster Weihnachtsfeiertag)";
        return;
    }
    else if (date.getTime() == christmas.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (unity.toLocaleDateString()) + " (Tag der Deutschen Einheit)";
        document.getElementById("nextHoliday").innerHTML = (christmas2.toLocaleDateString()) + " (Zweiter Weihnachtsfeiertag)";
        return;
    }
    else if (date.getTime() == christmas2.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (christmas.toLocaleDateString()) + " (Erster Weihnachtsfeiertag)";
        document.getElementById("nextHoliday").innerHTML = (newYearNxt.toLocaleDateString()) + " (Neujahr)";
        return;
    }
    else if (date.getTime() > christmas2.getTime()) {
        document.getElementById("lastHoliday").innerHTML = (christmas2.toLocaleDateString()) + " (Zweiter Weihnachtsfeiertag)";
        document.getElementById("nextHoliday").innerHTML = (newYearNxt.toLocaleDateString()) + " (Neujahr)";
        return;
    }
    document.getElementById("lastHoliday").innerHTML = "LANGWEILIGSTE";
}