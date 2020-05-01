/*
    Everything that happens in here will occur on index.html page load.
*/

window.onload;

init_storage();
refreshNotes();

//Load the Markdown editor
//TODO need to consider what happens when edit note is called, will it properly grab from simplemde?
var simplemde = new SimpleMDE({ element: document.getElementById("note"), placeholder: "Click \"save\" to save your note to your browser." });
var editMDE = new SimpleMDE({ element: document.getElementById("editnote"), placeholder: "You are editing your note." });