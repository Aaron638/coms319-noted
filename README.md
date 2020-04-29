# Noted "smart" notetaking app.

## We currently have 4 cards:
- EventCard
- ImageCard
- MapCard
- TextCard

Each of these cards are stored in a folder with their name, and have corresponding html, css, and js files.
Their html files are just little content blocks, kind of like how Google Keep has "Cards".

When you save a note, index.html gets appended with an object element, and an embed element. 
The text of the note is added to a Note object, it is classified as one of the following cardtypes, and then it is saved in local storage.
The Note objects saved in localStorage have the following properties:

- `noteName:	"noteN"` , where N is the note's position in the storage array
- `text:		"The text inputted by the user"` which can also be any data, for example an object like {"title":"test","date":"04/28/2020 11:09 PM"}
- `datatype:	"text"`, `"map"`, `"image"`, or `"event"`
- `html:		"<object> <embed src="./link/to/file.html?cardkey=data" >"` html stored as a string for displaying in `index.html`.

`html` lets us embed an `html` file in another `html` file. This is how cards work.
The link to the html file has a query, which is a little bit of data we put in the URL, which looks like: 

` ./CardFolder/Card.html?cardkey=data_we_want_to_send_to_card `

The card's `.js` file will look at the query, and use it as a key to access local storage, which has the note object.
The note object's `text` field is then used to populate the card.
