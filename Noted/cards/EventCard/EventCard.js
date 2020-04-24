/*
    EventCard.js handles data passing to the event card
    We can pass data to fill in the spans, and properly set up the event link
    https://stackoverflow.com/a/4784796

*/

function setTitle(title) {
    var titleSpan = document.getElementById("event-title");
    titleSpan.appendChild(document.createTextNode(title));
}

//Sets start and end date
//fills the spans with the corresponding data
//assume start and end date are already js Date() objects
function defineDate(startDate, endDate) {
    var dateSpan = document.getElementById("date");
    var timeSpan = document.getElementById("time");

    dateSpan.appendChild(document.createTextNode(startDate.toDateString()));
    var timeInterval = String(startDate.getHours()) + ":" + minuteMan(startDate) + "-" + String(endDate.getHours()) + ":" + minuteMan(endDate);
    timeSpan.appendChild(document.createTextNode(timeInterval));
}

//Give a date
//if more than 1 digit in minutes, append a zero at the start
//return minutes as a string
function minuteMan(date) {
    var minutes = date.getMinutes();
    if (Math.floor(minutes / 10) > 0) {//2 digits
        return String(date.getMinutes());
    } else {
        return "0" + String(date.getMinutes());   //return 12:05, but just 05
    }
}

//im too lazy so i copy pasted code sorry
function hourMan(date) {
    var hour = date.getHours();
    if (Math.floor(hour / 10) > 0) {//2 digits
        return String(date.getHours());
    } else {
        return "0" + String(date.getHours());   //return 12:05, but just 05
    }
}

//Edit the Google calendar link
//https://stackoverflow.com/a/21653600
function calendarLink(title, startDate, endDate) {
    //Constructing the date
    //Using https://stackoverflow.com/a/3067896
    //Add a function to Date()
    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('');
    };

    //Dates must be YYYYMMDD"T"HHmmSS/YYYYMMDD"T"HHmmSS
    var startString = startDate.yyyymmdd();
    var endString = endDate.yyyymmdd();

    var urlStr = "https://calendar.google.com/calendar/r/eventedit?" +
        "&text=" + title +
        "&dates=" + startString + "T" + hourMan(startDate) + minuteMan(startDate) + "00" + "/" + endString + "T" + hourMan(endDate) + minuteMan(endDate) + "00" +
        "ctz=America%2FChicago";
    //replace the spaces with %20 for the url
    urlStr = urlStr.replace(/ /g, "%20");
    document.getElementById("calendarlink").href = urlStr;
}


//Run the code on windowload
window.onload;
//get from url parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var key = urlParams.get("cardkey");
console.log(key);
//load the event object from storage
var eventObject = JSON.parse(localStorage.getItem(key));
console.log(eventObject);
console.log(eventObject.start);
setTitle(eventObject.title);
defineDate(new Date(eventObject.start), new Date(eventObject.end));
calendarLink(eventObject.title, new Date(eventObject.start), new Date(eventObject.end));