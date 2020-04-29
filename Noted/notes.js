/*
    notes.js handles the non-data storage aspect of the application
*/

/*
    Adds the note in the form to web storage and calls refreshNotes()
*/
function addNote() {
    valCheck = true;
    var newNoteText = document.forms["newNote"]["note"].value;

    var noteObject;

    if (document.getElementById("checkIsMap").checked) {
        noteObject = pushNote(newNoteText, true);
    } else {
        noteObject = pushNote(newNoteText, false);
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
    var list = document.getElementById('noteList');
    list.innerHTML = ""; //resets the list to empty
    for (var i = parseInt(getNumNotes()); i > 0; i--) {

        var noteObj = getNote(i);
        if (!((noteObj == undefined) || (noteObj == null))) {
            //var noteText = getNoteText(i);
            var node = document.createElement("LI");

            //The tagMap function needs to be in this refreshNotes function because it happens last
            //While theres probably a better way, if we modify the HTML last second,
            //theres little room for error
            if (noteObj.isMap == true) {
                var html = "<button type=\"button\" class=\"collapsible\">" + noteObj.text + "</button>" +
                    "<div class=\"content\">" +
                    "<div id=\"" + noteObj.text + "\" style=\"height: 480px;\"> </div> " +
                    "</div>";
                html += "<br><button type=\"button\" class=\"del\" onClick=\"deleteNote(\'" + noteObj.noteName + "\'); refreshNotes()\">Delete</button>";
                node.innerHTML = html;
                //Once the HTML is properly set, tagMap can work to override the div
                tagMap(noteObj.text);
            } else if (noteObj.isCard == true) { //TODO, use generate HTML for cards instead
                var html =
                    "<div class = \"content\">" +
                    noteObj.text +
                    "</div>";
                node.innerHTML = html;
            } else {
                node.innerHTML = noteObj.html;
            }

            list.appendChild(node);
        }
    }
    collapseHandler();
}

/*
	This function is called by refreshNotes to handle the collapsing of the map iframes
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