/*
	STORAGE IS IN THE FOLLOWING FORMAT:
	numNotes, num - keeps track of number of notes saved  in local storage
	noteN, text - N is the ID of the note
*/
function init_storage() {
    if (typeof(Storage) == "undefined") {
        document.getElementById("result").innerHTML = "Your browser doesn't support Web Storage! Noted will not work.";
    } else {
        if (localStorage.getItem("numNotes") === NaN || localStorage.getItem("numNotes") === null) {
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
	Input: data of the new note, boolean isMap
*/
function pushNote(data, isMap) {
    var numNotes = parseInt(getNumNotes());
    numNotes += 1;
    localStorage.setItem("numNotes", parseInt(numNotes));
    var noteName = 'note' + numNotes;

    //Make the note object, and classify it as "text", "map", or "image" ("event" note creation in /datetimepicker/sendEvent.js)
    var newNote = new Note(noteName, data, classifiyNote(data, isMap));
    console.log("Setting note" + numNotes + " to: " + newNote.text + "as type: " + newNote.datatype);

    //generate the html card for that note
    newNote.html = generateHTML(newNote);

    //store the note object and return
    localStorage.setItem(noteName, JSON.stringify(newNote));
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
    if (isMap == true) {
        return "map";
    } else if (inputText.search(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gm) > 0) {
        return "image";
    } else {
        return "text";
    }
}

/*
	generateHTML is now heavily modified to work with "Cards"
	"Cards" are their own HTML pages that are embedded into index.html.
	
	The cards in local storage have:
	Key - "noteN_dataType"
	Data - the text of the card

	Input: note object
	Output: html for embedding a card
*/
function generateHTML(noteObj) {
    console.log(noteObj);
    var pathToCardHTMLstring;

    if (noteObj.datatype == "map") {
        pathToCardHTMLstring = "/Noted/cards/MapCard/MapCard.html";
    } else if (noteObj.datatype == "image") {
        pathToCardHTMLstring = "/Noted/cards/ImageCard/ImageCard.html";
    } else {
        pathToCardHTMLstring = "/Noted/cards/TextCard/TextCard.html";
    }

    //TODO make sure the text card has a script that parses into markdown
    //no longer using local storage, straight up use the noteName as the key
    //modify the html in the card's script not in here.
    // localStorage.setItem(key, JSON.stringify(noteObj.text));
    //https://stackoverflow.com/a/16108864 

    // html = '<object width="600" height="400">' +
    //     '    <embed src=\"' + pathToCardHTMLstring + '?cardkey=' + noteObj.noteName + '\" width=\"600\" height=\"400\"> </embed>' +
    //     '</object>';
    html = "<div class=\"row\" style=\"padding-bottom: 0;\">" +
        "<embed src=\"" + pathToCardHTMLstring + "?cardkey=" + noteObj.noteName + "\" class=\"col s6\" height=\"325\"> </embed>" +
        "</div>";

    //concatenate delete and edit buttons onto the html
    html += "<button type=\"button\" class=\"del button button1 white\" onClick=\"deleteNote(\'" + noteObj.noteName + "\'); refreshNotes()\">Delete</button><button type=\"button\" class=\"edit button button1 white\" onClick=\"enterEditOverlay(\'" + noteObj.noteName + "\');\">Edit</button>";
    return html;
}

function editNote(noteName) {
    var noteObj = JSON.parse(localStorage.getItem(noteName));
    valCheck = true;

    var newNoteText = editMDE.value();
    noteObj.text = newNoteText;
    var isMap = false;
    if (noteObj.datatype == "map") {
        isMap = true;
    }
    noteObj.datatype = classifiyNote(noteObj, isMap);
    noteObj.html = generateHTML(noteObj);

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