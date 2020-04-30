/*
    Everything that happens in here will occur on index.html page load.
*/

window.onload;

init_storage();
refreshNotes();

//Load the Markdown editor
var simplemde = new SimpleMDE({ placeholder: "Click \"save\" to save your note to your browser." });
simplemde.value();