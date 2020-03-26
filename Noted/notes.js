/*
    notes.js handles the non-data storage aspect of the application
*/

/*
    Adds the note in the form to web storage and calls refreshNotes()
*/
function addNote() {
    valCheck = true;

    var newNoteData = document.forms["newNote"]["note"].value;
    pushNote(newNoteData);

    refreshNotes();

}

/*
    Pulls notes from the web storage and displays it on the page
*/
function refreshNotes() {
    var list = document.getElementById('noteList');
    list.innerHTML = ""; //resets the list to empty
    for (var i = parseInt(getNumNotes()); i > 0; i--){
        var note = getNote(i);
        var node = document.createElement("LI");
        var textnode = document.createTextNode(note);
        node.appendChild(textnode);
        list.appendChild(node);
    }
}