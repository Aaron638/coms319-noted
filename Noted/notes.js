/*
    notes.js handles the non-data storage aspect of the application
*/

/*
    Adds the note in the form to web storage and calls refreshNotes()
*/
function addNote() {
    valCheck = true;

    var newNoteData = document.forms["newNote"]["note"].value;
    pushNote(newNoteData, "text");

    refreshNotes();

}

/*
    Pulls notes from the web storage and displays it on the page
*/
function refreshNotes() {
    var list = document.getElementById('noteList');
    list.innerHTML = ""; //resets the list to empty
    for (var i = parseInt(getNumNotes()); i > 0; i--){
        var note = getNoteText(i);
        var node = document.createElement("LI");
        note = convert(note); //parse into md
        node.innerHTML = note;
        list.appendChild(node);
    }
}

/*
	This function is called by refreshNotes to handle the collapsing of the map iframes
*/
function collapseHandler() {
	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function () {
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