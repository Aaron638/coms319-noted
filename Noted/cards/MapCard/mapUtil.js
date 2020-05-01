/*
    Technologies:
    OpenStreetMap (OSM) for map
	Leafletjs for JS API to create maps
	MapBox for "tiles" for maps idk what this is tbh
    OpenCage Geocoding API for getting LatLng from text

    mapNote.js helps output map iframes with HTTP requests given location text

    using fetch api, we send an HTTP GET request to opencage api

*/

async function tagMap(placename) {
    //https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=YOUR-API-KEY&limit=1
    var url = "https://api.opencagedata.com/geocode/v1/json?q=" + placename + "&key=0b75842b64ad4f21b1598f9c3ea41ac8&limit=1";

    console.log(placename);

    fetch(url).then(function (response) {
        // Convert to JSON
        return response.json();
    }).then(function (j) {
        //`j` is a JavaScript object
        console.log(j);
        var lat = j.results[0].geometry.lat;
        console.log(lat);
        var lng = j.results[0].geometry.lng;
        console.log(lng);
        showMap(placename, lat, lng);
    });
}

/*
showMap edits a map with div id mapObject.text to show an OpenStreetMap
*/
function showMap(mapid, latt, long) {

    var myMap = L.map(mapid).setView([latt, long], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm90ZWR0ZWFtIiwiYSI6ImNrOGhya2ZhbjAzd20zZ250bGt1dTU0enAifQ.N51kuC6pwdITxEtz_pmqLQ', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(myMap);
}


