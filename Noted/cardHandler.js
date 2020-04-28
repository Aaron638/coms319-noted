/*
    cardHandler.js helps the programmers take cards and insert them into the website.

    A large part of our problems when implementing the other features, is the management of HTML with our card objects.
    cardHandler.js takes .html files from /Noted/Cards/ and can insert them into index.html.

    Using the object and emebed tags, we can easily place HTML within HTML without hassle:
    https://stackoverflow.com/a/8702778

    The difficulty is handling the passing of data between the cards. This is done using parameters in the path to the card
    for example ./cards/EventCard/EventCard.html?cardkey=note1

*/

/*
    Generic make card function
    First we place the object we would like to embed in the card in local storage.
    Then we modifiy the div with id=divIDstring
        It includes the path to where the html card is located
        And a keystring to access the object in local storage.

    The HTML looks like this:
    <object width="600" height="400">
        <embed src="./path/to.html?cardkey=keystring" width="600" height="400"> </embed>
    </object>

*/
function makeCard(keystring, pathToCardHTMLstring) {
    //localStorage.setItem(titleKey, JSON.stringify(object));
    return '<object width="600" height="400">' +
        '    <embed src=\"' + pathToCardHTMLstring + '?cardkey=' + keystring + '\" width=\"600\" height=\"400\"> </embed>' +
        '</object>';
}


//DEPERECATED
// function makeEventCard(eventTitle, startDate, endDate) {

//     //We make an event object, and pass that into the card
//     var eventObject = { title: eventTitle, start: startDate, end: endDate };
//     //the item is stored in local storage
//     //key: eventTitle, data: {title: eventTitle, start: startDate, end: endDate}
//     localStorage.setItem(eventTitle, JSON.stringify(eventObject));

//     //create the card element
//     //the path to the card includes a cardkey paramter in the URL
//     document.getElementById("cardHere").innerHTML = '<object width="600" height="400">' +
//         '    <embed src=\"./EventCard/EventCard.html?cardkey=' + eventTitle + '\" width=\"600\" height=\"400\"> </embed>' +
//         '</object>';


// }

// window.onload = makeEventCard("Event Card", (new Date()), (new Date(2020, 3, 24, 11)));

