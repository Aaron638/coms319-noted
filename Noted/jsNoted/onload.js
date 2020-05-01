/*
    Everything that happens in here will occur on index.html page load.
*/

window.onload;

var finishedEditing = true;

init_storage();
refreshNotes();

//Load the Markdown editor
//TODO need to consider what happens when edit note is called, will it properly grab from simplemde?
var simplemde = new SimpleMDE({ element: document.getElementById("note"), placeholder: "Click \"save\" to save your note to your browser." });
var editMDE = new SimpleMDE({ element: document.getElementById("editnote"), placeholder: "You are editing your note." });

//Collapsible
document.addEventListener('DOMContentLoaded', function() {
    var elemCollapse = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elemCollapse, {});
});

//Datepicker
document.addEventListener('DOMContentLoaded', function() {
    var elemDatepicker = document.querySelectorAll('.datepicker');
    var datepicker = M.Datepicker.init(elemDatepicker, {});
});

//Timepicker
document.addEventListener('DOMContentLoaded', function() {
    var elemTimepicker = document.querySelectorAll('.timepicker');
    var timepicker = M.Timepicker.init(elemTimepicker, { twelveHour: false });
});