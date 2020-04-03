/*
    Map class

	Map objects are stored as such:
		{	text:	"New York", //Also acts as mapid
			lat:	40.713051,
			lng:	-74.007233
        }
        
*/

class Map {
    constructor(text) {
        this.text = text;
        this.lat;
        this.lng;

        getCoordFromPlace(text, function (response) {
            var responseObj = JSON.parse(response);
            lat = responseObj.results[0].geometry.lat;
            lng = responseObj.results[0].geometry.lng;
        });

    }

    /*
    showMap edits a map with div id mapObject.text to show an OpenStreetMap
    */
    showMap() {
        console.log(this.text);
        console.log(this.lat);
        console.log(this.long);
        
        var myMap = L.map(this.text).setView([this.lat, this.lng], 13);

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
}