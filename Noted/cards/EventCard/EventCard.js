/*
    EventCard.js handles data passing to the event card
    We can pass data to fill in the spans, and properly set up the event link
    https://stackoverflow.com/a/4784796
*/

class EventCard{
    constructor(title) {
        this.title = title;
        var titleSpan = currentDocument.getElementById("event-title");
        titleSpan.appendChild(currentDocument.createTextNode(title));
        this.startDate;
        this.endDate;
    }

    //Sets start and end date
    //fills the spans with the corresponding data
    //assume start and end date are already js Date() objects
    defineDate(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;

        var dateSpan = currentDocument.getElementById("date");
        var timeSpan = currentDocument.getElementById("time");
6
        dateSpan.appendChild(currentDocument.createTextNode(startDate.toDateString()));
        var timeInterval = String(startDate.getHours()) + ":" + this.minuteMan(startDate.getMinutes()) + "-" + String(endDate.getHours()) + ":" + this.minuteMan(endDate.getMinutes());
        timeSpan.appendChild(currentDocument.createTextNode(timeInterval));
    }

    //Give an integer of minutes
    //if more than 1 digit, append a zero at the start
    //return minutes as a string
    minuteMan(minutes) {
        if (Math.floor(minutes / 10) > 0) {//2 digits
            return String(minutes);
        } else {
            return "0" + String(minutes);   //return 12:05, but just 05
        }
    }

    //Edit the Google calendar link
    //https://stackoverflow.com/a/21653600
    calendarLink() {
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
        var startString = this.startDate.yyyymmdd();
        var endString = this.endDate.yyyymmdd();

        var urlStr = "https://calendar.google.com/calendar/r/eventedit?" +
            "&text=" + this.title +
            "&dates=" + startString + "T" + this.startDate.getHours() + this.startDate.getMinutes() + "00" + "/" + endString + "T" + this.endDate.getHours() + this.endDate.getMinutes();
        //replace the spaces with %20 for the url
        urlStr = urlStr.replace(/ /g, "%20");
        currentDocument.getElementById("calendarlink").href = urlStr;
    }

}

//Now we run the code
const ecard = new EventCard("school's over");
ecard.defineDate(new Date(), new Date(2020, 11, 17, 3, 24, 0));

