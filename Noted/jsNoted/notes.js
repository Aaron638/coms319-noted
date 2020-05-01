/*
    notes.js handles the non-data storage aspect of the application
*/

/*
    Adds the note in the form to web storage and calls refreshNotes()
*/
function addNote() {
    valCheck = true;
    //Get the note text from the markdown editor
    var newNoteText = simplemde.value();
    console.log(simplemde.value());

    if (document.getElementById("checkIsMap").checked) {
        console.log("the note is a map")
        pushNote(newNoteText, true);
    } else {
        pushNote(newNoteText, false);
    }

    refreshNotes();
}

function deleteNote(num) {
    var note = popNote(num);
}

/*
    Pulls notes from the web storage and displays it on the page
*/
function refreshNotes() {
    for (var i = 1; i <= getNumNotes(); i++) {
        console.log(String(localStorage.getItem("note" + i)));
    }
    var list = document.getElementById('noteList');
    list.innerHTML = ""; //resets the list to empty

    //For every note in local storage
    for (var i = parseInt(getNumNotes()); i > 0; i--) {
        var noteObj = getNote(i);

        if (!((noteObj == undefined) || (noteObj == null))) {
            //Append a list element with the note's designated HTML.
            var node = document.createElement("LI");
            node.innerHTML = noteObj.html;
            list.appendChild(node);
        }
    }
    // collapseHandler();
}

function saveEvent() {
    //Date from datepicker
    var dpElem = document.getElementById("dp");
    var instance = M.Datepicker.getInstance(dpElem);
    var date = instance.toString();
    console.log("date from dp:" + date);

    //Time from timepicker
    var tpElem = document.getElementById("tp");
    var timeinstance = M.Timepicker.getInstance(tpElem);
    console.log(timeinstance);
    var min = timeinstance.minutes;
    var hrs = timeinstance.hours;
    var jsDate = new Date(date + " " + hrs + ":" + min);

    //Title from text input
    var title = document.getElementById("eventTitle").value;

    var noteData = {
        title: title,
        date: jsDate
    }

    console.log("Date object is:" + noteData);

    //Copy pushNote(), send a note
    //Update numNotes, and make a new note
    var numNotes = parseInt(getNumNotes());
    numNotes += 1;
    localStorage.setItem("numNotes", parseInt(numNotes));
    var noteName = 'note' + numNotes;

    //Make the note object, classified as event
    var newNote = new Note(noteName, noteData, "event");
    console.log("Setting note" + numNotes + " to: " + newNote.text + "as type: " + newNote.datatype);

    //generate the html card for that note
    newNote.html = generateHTML(newNote);

    //store the note object and return
    localStorage.setItem(noteName, JSON.stringify(newNote));
    refreshNotes();
}

/*
    These functions are for the edit note overlay:
*/
function exitOverlay() {
    document.getElementById("editOverlay").style.display = "none";
}

function enterEditOverlay(noteName) {
    document.getElementById("editbutton").setAttribute("onClick", "editNote(\'" + noteName + "\');");
    document.getElementById("editOverlay").style.display = "block";
}