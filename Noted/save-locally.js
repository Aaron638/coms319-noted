/*
	STORAGE IS IN THE FOLLOWING FORMAT:
	numNotes, num - keeps track of number of notes saved  in local storage
	noteN, text - N is the ID of the note
*/
function init_storage() {
    if (typeof(Storage) == "undefined") {
        document.getElementById("result").innerHTML = "Your browser doesn't support Web Storage! Noted will not work.";
    } else {
        if (localStorage.getItem("numNotes") === NaN) {
            console.log("numNotes is NULL, resetting local storage.")
            localStorage.clear();
            localStorage.setItem("numNotes", parseInt(0));
        }
    }
}

function reset_storage() {
    localStorage.clear();
    localStorage.setItem("numNotes", parseInt(0));
}


/*
	Simple getter function to return the # of notes
	Input: none
	Output: number of notes
*/
function getNumNotes() {
    if (localStorage.getItem("numNotes") != null) {
        return parseInt(localStorage.getItem("numNotes"));
    } else {
        console.error("numNotes is null");
    }
}

/*
	Creates a new note with the given data and updates the numNotes
	Input: data of the new note, whether the note is a map or not
	Output: Note object
*/
function pushNote(data, isMap) {
    var numNotes = parseInt(getNumNotes());
    numNotes += 1;
    localStorage.setItem("numNotes", parseInt(numNotes));
    var noteName = 'note' + numNotes;

    //Take the note's data, which is currently text, and classify it.
    var cardType = classifiyNote(data, isMap);

    //Make the note object
    console.log("Setting note" + numNotes + " to: " + data + "as type: " + cardType);
    var newNote = new Note(noteName, data, cardType);

    //generate the html card for that note
    newNote.html = generateHTML(newNote);

    //store the note object and return
    localStorage.setItem(noteName, JSON.stringify(newNote));
    return newNote;
}

/*
	This function classifies notes using keywords.
	By default all notes are TEXT cards.
	Notes that contain a link starting in http:// and ending in .jpg, .png or .gif are IMAGE cards.
	Notes that are submitted with a checkmark are MAP cards.

	RegEx from here:
	https://stackoverflow.com/a/26972181
	https://regexr.com/3g1v7

	EVENT cards are handled by sendEvent.js in datetimepicker.html

	Input:	text as a string
			isMap as a boolean
	Output:	note datatype which is either "text", "map", or "image"
*/
function classifiyNote(inputText, isMap) {
    if (inputText.search(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gm) > 0) {
        return "image"
    } else if (isMap == true) {
        return "map";
    } else {
        return "text";
    }
}

/*
	generateHTML is now heavily modified to work with "Cards"
	"Cards" are their own HTML files that are embedded into the page.
	
	The cards in local storage have:
	Key - "noteN_dataType"
	Data - the data to be used by the card 
		so for example a Date() object for an event card

	Input: note object
	Output: html for embedding a card
*/
function generateHTML(noteObj) {
    var html = "";
    var keyString = noteObj.noteName + "_" + noteObj.dataType;
    var cardData, pathToCardHTMLstring;

    if (noteObj.dataType == "map") {

    }
    // else if (noteObj.dataType == "event") {
    //     var dates = dateHandler

    //     cardData = {
    //         title: noteObj.text,
    //         start: startDate,
    //         end: endDate
    //     };
    //     localStorage.setItem(keyString, JSON.stringify(object));
    //     pathToCardHTMLstring = "./ImageCard/ImageCard.html";
    // } 
    else if (noteObj.dataType == "image") {
        cardData = noteObj.text;
        localStorage.setItem(keyString, JSON.stringify(object));
        pathToCardHTMLstring = "./ImageCard/ImageCard.html";
    } else { //TODO make sure the text card has a script that parses into markdown
        cardData = noteObj.text;
        localStorage.setItem(keyString, JSON.stringify(object));
        pathToCardHTMLstring = "./TextCard/TextCard.html";
    }


    html = '<object width="600" height="400">' +
        '    <embed src=\"' + pathToCardHTMLstring + '?cardkey=' + keystring + '\" width=\"600\" height=\"400\"> </embed>' +
        '</object>';

    //concatenate delete and edit buttons onto the html
    html += "<br><button type=\"button\" class=\"del\" onClick=\"deleteNote(\'" + noteObj.noteName + "\'); refreshNotes()\">Delete</button><button type=\"button\" class=\"edit\" onClick=\"enterEditOverlay(\'" + noteObj.noteName + "\');\">Edit</button>";
    return html;
}

function editNote(noteName) {
    var noteObj = JSON.parse(localStorage.getItem(noteName));
    valCheck = true;

    var newNoteText = document.forms["editNote"]["editnote"].value;

    noteObj.text = newNoteText;
    generateHTML(noteObj);

    localStorage.setItem(noteName, JSON.stringify(noteObj));

    refreshNotes();
}

/*
	Deletes the note with the given noteName from localStorage, returns the deleted note object
	Input: noteName
	Output: Note object deleted
*/
function popNote(noteName) {
    var deletedNote = localStorage.getItem(noteName);
    localStorage.removeItem(noteName);

    console.log(noteName + " removed from local storage.");
    return deletedNote;
}

/*
	Returns the note data of the given ID/num
	Input: ID/num of desired note
	Output: parsed JSON object of the note requested
*/
function getNote(num) {
    var noteName = 'note' + num;
    var returnedNote = localStorage.getItem(noteName);
    if (returnedNote != null) {
        return JSON.parse(returnedNote);
    }
}

function getNoteText(num) {
    var note = getNote(num);
    return note.text;
}

function isNoteMap(num) {
    var note = getNote(num);
    return note.isMap;
}