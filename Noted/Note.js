/*
	Note class
*/

var Note = function(noteName, data, datatype) {
		this.isMap = false;
		this.noteName = noteName;

		if(datatype == "text"){
			this.text = data;
		} else if (datatype == "map"){
			this.isMap = true;
			this.text = data;
		} else if (datatype == "card"){
			this.text = data;
			this.isCard = true;
		}

		this.html = "";
	
};