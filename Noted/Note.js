/*
	Note class
*/

class Note {
	constructor(noteName, data, datatype){
		this.isMap = false;
		this.noteName = noteName;

		if(datatype == "text"){
			this.text = data;
		} else if (datatype == "map"){
			this.isMap = true;
			this.text = data;
		}

		var html = "";
		if (this.isMap){
			  html =  "<button type=\"button\" class=\"collapsible\">" + this.text + "</button>" +
			              "<div class=\"content\">" +
			              "<div id=\"" + this.text + "\" style=\"height: 480px;\"> </div> " +
			              "</div>";
			  tagMap(this.text);
			  html += "<br><button type=\"button\" class=\"del\" onClick=\"deleteNote(\'" + this.noteName + "\'); refreshNotes()\">Delete</button>"
		} else {
			    html = convert(this.text); //parse into md
			    html += "<br><button type=\"button\" class=\"del\" onClick=\"deleteNote(\'" + this.noteName + "\'); refreshNotes()\">Delete</button>"
		}
		console.log(html);
		this.html = html;

	}

	
}