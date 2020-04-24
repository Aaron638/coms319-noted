#TODO

##For the workflow to display cards, we must do the following:

index.html
    User enters a note and submits it

    notes.js 
    addNote() parses the user input
    the information type is determined(text, map, event etc.)
        save-locally.js
        pushNote()
            saves the user input as a JS object in local storage under {key}, currently noteN

    refreshNotes() is called to display the notes from storage
        generateHTML() is called to generate card HTML
            cardHandler.js 
            makeCard() will modify a div in index.html to display a card from /cards/
                the card created has a path with a parameter like "?cardkey={key}"
    card.html
        card.js
            on window.onload
            The {key} is obtained from the URL parameter.
            The JS object is obtained from local storage using {key}
            The card HTML DOM is modified to display information from the JS object

