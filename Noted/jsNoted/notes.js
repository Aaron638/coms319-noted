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
    collapseHandler();
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

/*
    This function is called by refreshNotes to handle the collapsing of the map iframes
    TODO Switch to CSS collapsing, more performant and cooler to look at, buttons are ugly
*/
function collapseHandler() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}