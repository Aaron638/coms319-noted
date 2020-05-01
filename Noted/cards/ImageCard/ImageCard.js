/*
    EventCard.js handles data passing to the event card
    We can pass data to fill in the spans, and properly set up the event link
    https://stackoverflow.com/a/4784796

*/

function setTitle(title) {
    var titleSpan = document.getElementById("event-title");
    titleSpan.appendChild(document.createTextNode(title));
}

function configureLinks(url) {
    var imagelink = document.getElementById("imageLink");
    var cardPic = document.getElementById("cardImage");

    imagelink.href = url;
    cardPic.src = url;
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
console.log(eventObject.text);
configureLinks(eventObject.text);

// setTitle(eventObject.title);
// defineDate(new Date(eventObject.start), new Date(eventObject.end));
// calendarLink(eventObject.title, new Date(eventObject.start), new Date(eventObject.end));