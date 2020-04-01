/*
	Note class
*/

class Note {
	constructor(noteName, data, datatype){
		this.noteName = noteName;
		if(datatype == "text"){
			this.text = data;
		}
	}
}