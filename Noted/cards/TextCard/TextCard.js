/*
    EventCard.js handles data passing to the event card
    We can pass data to fill in the spans, and properly set up the event link
    https://stackoverflow.com/a/4784796

*/

// Determines if the passed element is overflowing its bounds,
// either vertically or horizontally.
// Will temporarily modify the "overflow" style to detect this
// if necessary.
//https://stackoverflow.com/a/143889
function checkOverflow(el) {
    var curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth ||
        el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
}

function setTitle(title) {
    var titleSpan = document.getElementById("event-title");
    titleSpan.appendChild(document.createTextNode(title));
}



//Run the code on windowload
window.onload;

//get from url parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var key = urlParams.get("cardkey");
console.log("Key to access data is: " + key);
//load the note from storage
var noteObject = JSON.parse(localStorage.getItem(key));
console.log("Card text is: " + noteObject);


setTitle(eventObject.title);
defineDate(new Date(eventObject.start), new Date(eventObject.end));
calendarLink(eventObject.title, new Date(eventObject.start), new Date(eventObject.end));