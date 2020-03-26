/*
	STORAGE IS IN THE FOLLOWING FORMAT:
	numNotes, num - keeps track of number of notes saved  in local storage
	noteN, text - N is the ID of the note
*/
function init_storage(){
	if (typeof(Storage) == "undefined") {
			document.getElementById("result").innerHTML = "Your browser doesn't support Web Storage! Noted will not work.";
		}
		else {
			if (localStorage.getItem("numNotes") === NaN){
				console.log("numNotes is NULL, resetting local storage.")
				localStorage.clear();
				localStorage.setItem("numNotes", parseInt(0));
			}
		}
}

function reset_storage(){
	localStorage.clear();
	localStorage.setItem("numNotes", parseInt(0));
}


/*
	Simple getter function to return the # of notes
	Input: none
	Output: number of notes
*/
function getNumNotes(){
	if (localStorage.getItem("numNotes") != null){
		return parseInt(localStorage.getItem("numNotes"));
	}
	else {
		console.error("numNotes is null");
	}
}

/*
	Creates a new note with the given data and updates the numNotes
	Input: data/text of the new note
	Output: none
*/
function pushNote(data){
	var numNotes = parseInt(getNumNotes());
	numNotes += 1;
	localStorage.setItem("numNotes", parseInt(numNotes));
	var noteName = 'note' + numNotes;
	console.log("Setting note" + numNotes + " to: " + data);
	localStorage.setItem(noteName, data);
}

/*
	Returns the note data of the given ID/num
	Input: ID/num of desired note
	Output: Data (usually text) associated with the given note ID
*/
function getNote(num){
	var noteName = 'note' + num;
	if (localStorage.getItem(noteName) != null){
		return localStorage.getItem(noteName);
	}
}