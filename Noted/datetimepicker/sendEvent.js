/*
    This function uses the same principle as how we access cards.
    Instead it uses the collapsible's HTML elements.
    Anything from the datetimpepicker.html needs to be forwarded to index.html. 
    We get the date and text, and use a form to send it back to index.
    https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
*/
function sendEventData() {
    var date = $('#datepicker-inline').data('date');
    var text = document.getElementById("eventText").value;

    var eventObject = {
        title: text,
        date: date
    }

    var numNotes = parseInt(getNumNotes());
    numNotes += 1;
    localStorage.setItem("numNotes", parseInt(numNotes));
    var noteName = 'note' + numNotes;
    var newNote = new Note(noteName, eventObject, "event");

    newNote.html = '<object>' +
        '    <embed src=\"./EventCard/EventCard.html?cardkey=' + noteName + '\" width=\"600\" height=\"400\"> </embed>' +
        '</object>';

    localStorage.setItem(noteName, JSON.stringify(newNote));
    console.log(newNote);

    alert("Refresh your notes to see the event");
}

function getNumNotes() {
    if (localStorage.getItem("numNotes") != null) {
        return parseInt(localStorage.getItem("numNotes"));
    } else {
        console.error("numNotes is null");
    }
}