/*
    notes.js handles the non-data storage aspect of the application
*/

/*
    Adds the note in the form to web storage and calls refreshNotes()
*/
function addNote() {
    valCheck = true;

    var newNoteText = document.forms["newNote"]["note"].value;

    if (document.getElementById("checkIsMap").checked) {
        pushNote(newNoteText, "map");
    } else {
        pushNote(newNoteText, "text");
    }



    refreshNotes();

}

function deleteNote(num){
    var note = popNote(num);
}

function generateHTML(noteObj){
    var html = "";
    if (noteObj.isMap){
          html =  "<button type=\"button\" class=\"collapsible\">" + noteObj.text + "</button>" +
                      "<div class=\"content\">" +
                      "<div id=\"" + noteObj.text + "\" style=\"height: 480px;\"> </div> " +
                      "</div>";
          html += "<br><button type=\"button\" class=\"del\" onClick=\"deleteNote(\'" + noteObj.noteName + "\'); refreshNotes()\">Delete</button>"
    } else {
            html = convert(noteObj.text); //parse into md
            html += "<br><button type=\"button\" class=\"del\" onClick=\"deleteNote(\'" + noteObj.noteName + "\'); refreshNotes()\">Delete</button><button type=\"button\" class=\"edit\" onClick=\"enterEditOverlay(\'" + noteObj.noteName + "\');\">Edit</button>"
    }
    noteObj.html = html;
    if (noteObj.isMap) tagMap(noteObj.text);
}

/*
    Pulls notes from the web storage and displays it on the page
*/
function refreshNotes() {
    var list = document.getElementById('noteList');
    list.innerHTML = ""; //resets the list to empty
    for (var i = parseInt(getNumNotes()); i > 0; i--) {

        var noteObj = getNote(i);
        if (!((noteObj == undefined)||(noteObj == null))){
            var noteText = getNoteText(i);
            var node = document.createElement("LI");
            node.innerHTML = noteObj.html;
        
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