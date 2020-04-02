/*
    mdParse.js parses text into the markdown format
*/

/*
    convert checks for the text md at the start of the note, then makes html objects to convert the text
    In the future we would want to automatically check markdown formatting by checking stuff like asterisks and other syntax

    returns the updated string

    As of now, supports
    *<i></i>*
    **<b></b>**
    __<u></u>__
    #<h1></h1>
    ##<h2></h2>
*/

//TODO need to implement this on a per line basis, not for the entire note

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
    setCharAt replaces the character at index with chr
    then returns the updated string
*/
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}
