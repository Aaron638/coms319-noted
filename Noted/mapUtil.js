/*
    Technologies:
    OpenStreetMap (OSM) for map
	Leafletjs for JS API to create maps
	MapBox for "tiles" for maps idk what this is tbh
    OpenCage Geocoding API for getting LatLng from text

    mapNote.js helps output map iframes with HTTP requests given location text

    We send an HTTP GET request with the placename to Open Cage.
    We wait for Open Cage to send us their JSON response.
    That then activates the callback function onComplete();
    onComplete lets us work with the JSON.

    Use like this:

    getCoordFromPlace(note, function(response){
        var responseObj = JSON.parse(response);
        //Do things with Response here 
	});
*/

function getCoordFromPlace(placename, callBack) {
    //https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=YOUR-API-KEY&limit=1
    var urlstr = "https://api.opencagedata.com/geocode/v1/json?q=" + placename + "&key=0b75842b64ad4f21b1598f9c3ea41ac8&limit=1";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)   //When we get a good response
            callBack(xmlHttp.responseText);                     //We go to the callback function w/ the JSON response
    };
    xmlHttp.open("GET", urlstr, true); // true for asynchronous 
    xmlHttp.send();
}
