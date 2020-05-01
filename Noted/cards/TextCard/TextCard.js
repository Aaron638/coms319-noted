//Run the code on windowload
window.onload;



//get from url parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var key = urlParams.get("cardkey");
console.log("Key to access data is: " + key);
//load the note from storage
var noteObject = JSON.parse(localStorage.getItem(key));
console.log(noteObject);
var markdownHTML = marked(noteObject.text);
console.log(markdownHTML);

var node = document.createElement("div");
node.innerHTML = markdownHTML;

document.getElementById('text').appendChild(node);