/*
	Note class

	noteName:	"noteN"
	text:		"Buy eggs today"
	datatype:	"text", "map", "image", or "event"
	html:		"formatted html"
*/

var Note = function(noteName, data, datatype) {
		this.noteName = noteName;
		this.text = data;
		this.datatype = datatype;
		this.html = "";
};