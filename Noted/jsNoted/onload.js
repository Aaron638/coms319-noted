/*
    Everything that happens in here will occur on index.html page load.
*/

window.onload;

init_storage();
refreshNotes();

//Load the Markdown editor
//TODO need to consider what happens when edit note is called, will it properly grab from simplemde?
var simplemde = new SimpleMDE({ placeholder: "Click \"save\" to save your note to your browser." });