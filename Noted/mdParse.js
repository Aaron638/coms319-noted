/*
    mdParse.js parses text into the markdown format

    For now on, marked.js will be used for markdown parsing.
	https://marked.js.org/#/README.md#README.md
	
	ONLY USE md()
*/

/*
	Make sure the html has this script so it can use marked.js:
	<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

	Input: A string formatted in markdown (# This is h1\n **This is bold**\n)
	Output: Converted HTML as a string.
*/
function md(string) {
	return marked(string);
}

/*
	Date Handler
	When a user wants to enter an event, they should input something like
	yyyymmdd
	time1 - time2
	
*/

/*
    DEPRECATED
    convert checks for the text md at the start of the note, then makes html objects to convert the text
    In the future we would want to automatically check markdown formatting by checking stuff like asterisks and other syntax

    Output: the updated string

    As of now, supports
    *<i></i>*
    **<b></b>**
    __<u></u>__
    #<h1></h1>
    ##<h2></h2>
*/

function convert(str) {
	if (/(__)?/g.test(str)) { //test for double underscore __, then underline
		str = str.replace(/(__)/g, "<u>");
		str = str.replace(/(__)/g, "</u>");
	}
	if (str.includes("##")) {
		str = str.replace("#", "");
		str = "<h2>".concat(str, "</h2>");
	}
	if (str.includes("#")) {
		str = str.replace("#", "");
		str = "<h1>".concat(str, "</h1>");
	}
	if (/(\*+){2}/g.test(str)) {//If there are 2 asterisks, bold it
		str = str.replace(/(\*+){2}/g, "<b>");
		str = str.replace(/(\*+){2}/g, "</b>");
	}
	if (str.includes("*")) {
		str = setCharAt(str, str.indexOf("*"), "<i>"); //replace first instance of *
		str = str.replace("*", "</i>");               //replace the next instance of *
	}
	return str;
}

/*
    DEPRECATED
    setCharAt replaces the character at index with chr
    then returns the updated string
*/
function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substr(0, index) + chr + str.substr(index + 1);
}
