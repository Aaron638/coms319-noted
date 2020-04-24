/*
    cardHandler.js helps the programmers take cards and insert them into the website.

    A large part of our problems when implementing the other features, is the management of HTML with our card objects.
    cardHandler.js takes .html files from /Noted/Cards/ and can insert them into index.html.

    Using the object and emebed tags, we can easily place HTML within HTML without hassle:
    https://stackoverflow.com/a/8702778

    The difficulty is handling the passing of data between the cards. This is done using parameters in the path to the card
    for example ./cards/EventCard/EventCard.html?cardkey=note1
*/

//TODO this is for the demo, delete this
function makeEventCard(eventTitle, startDate, endDate) {

    //We make an event object, and pass that into the card
    var eventObject = { title: eventTitle, start: startDate, end: endDate };
    //the item is stored in local storage
    //key: eventTitle, data: {title: eventTitle, start: startDate, end: endDate}
    localStorage.setItem(eventTitle, JSON.stringify(eventObject));

    //create the card element
    //the path to the card includes a cardkey paramter in the URL
    document.getElementById("cardHere").innerHTML = '<object width="600" height="400">' +
        '    <embed src=\"./cards/EventCard/EventCard.html?cardkey=' + eventTitle + '\" width=\"600\" height=\"400\"> </embed>' +
        '</object>';
    //for cardTester use /EventCard/EventCard.html?cardkey=
    //for index use 

}

//Generic make card function
function makeCard(titleKeystring, object, pathToCardHTMLstring, divIDstring) {
    localStorage.setItem(titleKey, JSON.stringify(object));
    document.getElementById(divIDstring).innerHTML = '<object width="600" height="400">' +
        '    <embed src=\"' + pathToCardHTMLstring + '?cardkey=' + titleKeystring + '\" width=\"600\" height=\"400\"> </embed>' +
        '</object>';
}