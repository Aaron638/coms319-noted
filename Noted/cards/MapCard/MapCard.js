function setTitle(title) {
    document.getElementById("titleSpan").innerText = title;
    document.getElementById("titleSpan2").innerText = title;
}


//Set the URL
function setLink(placename) {
    var url = "https://maps.google.com/?q=" + placename;
    var linkEl = document.getElementById("googleMapLink");
    linkEl.innerText = "Google Maps Link:";
    linkEl.href = url;
}

function setdesc(text) {
    document.getElementById("wikipediaDesc").innerText = text;
}

// //Gets item "name" from JSON
// function getNames(obj, name) {
//     for (var key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             if ("object" == typeof(obj[key])) {
//                 getNames(obj[key], name);
//             } else if (key == name) {
//                 return obj[key];
//             }
//         }
//     }
// }

// function getWikipediaDesc(placename) {
//     var url = "http://en.wikipedia.org/w/api.php?action=query&titles=Al-Farabi&prop=pageimages&format=json&" + placename;

//     fetch(url, { credentials: 'include' }).then(function(response) {
//         // Convert to JSON
//         return response.json();
//     }).then(function(j) {
//         //`j` is a JavaScript object
//         console.log(j);
//         // var lat = j.results[0].geometry.lat;
//         // console.log(lat);
//         // var lng = j.results[0].geometry.lng;
//         // console.log(lng);
//         var wikiString = getNames(j, extract);
//         setdesc(wikiString);
//     });
// }


//Run the code on card windowload
window.onload;

//get from url parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var key = urlParams.get("cardkey");
console.log("Key to access data is: " + key);
//load the note from storage
var noteObject = JSON.parse(localStorage.getItem(key));
console.log("Card text is: " + noteObject);

//Add a div to mapHolder, set it's id to the text entered.
var mapHolder = document.getElementById("mapHolder");
var mapnode = document.createElement("div");
mapHolder.appendChild(mapnode);
var place = "Ames, Iowa";
if (noteObject == null) {
    mapnode.id = place;
} else {
    place = noteObject.text;
    mapnode.id = place;
}
//Add map to card
document.getElementById(place).style.height = "80%";
tagMap(place);

//Set text and links
setLink(place);
setTitle(place);
//getWikipediaDesc(place);