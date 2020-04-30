/*
	Note class

	noteName:	"noteN"
	text:		"Buy eggs today" can be any data, for example an image url or an object like {"title":"test","date":"04/28/2020 11:09 PM"}
	datatype:	"text", "map", "image", or "event"
	html:		"formatted html"
*/

var Note = function(noteName, data, datatype) {
    this.noteName = noteName;
    this.text = data;
    this.datatype = datatype;
    this.html = "";
};