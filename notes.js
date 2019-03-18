console.log('Initialized notes.');

const fs = require('fs');
const request = require('request');


// -------------------------------------------------------------------NOTE FUNCTIONS----------------------------------------
    // Return all the notes in the file
const fetchNotes = () => {

    try {
        var stringNotes = fs.readFileSync('notes.json');
       return JSON.parse(stringNotes);
    }catch (e){
        console.log(e)
        return [];
    }
}
    // Takes a parameter of notes and save to file
const writeNotes = (notes) => {
    try {
            fs.writeFileSync('notes.json',JSON.stringify(notes));
        } catch (error) {
            
        }
}
    // Function to add a new note to file
const addNote = (title, body) => {
    let notes = [];

    let note = {
        title,
        body
    };

    notes = fetchNotes();
    let duplicateNote = notes.filter((note) => note.title === title);

    if(duplicateNote.length === 0){
        notes.push(note);
        writeNotes(notes);
        return true;
    }
}

const deleteNote = (title) => {
    let notes = fetchNotes();
    let newNotes = notes.filter((note) => note.title != title);
    
    writeNotes(newNotes);

    return newNotes.length !== notes.length;
    
}

const readNote = (title) => {
    let notes = fetchNotes();
    let note = notes.filter(note => note.title === title);

    return note[0];
} 


// -------------------------------------------MAP FUNCTIONS-------------------------------------------------

// darksky key 2e572d79f0a288a9003b19102c749c41

// Example address https://api.darksky.net/forecast/2e572d79f0a288a9003b19102c749c41/37.8267,-122.4233

// Return longitude and latitude of a location using google map API

const weatherLogResponse = (error, response, body) => {
    if(error){
            console.log('Error: ' + error);
            return false;
        }else{
            console.log(body)
            return {
                response,
                body
            }
        }
}
const findAddress = (location) => {
    console.log('Finding Address...')
    const encodedURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}`;
    
    const location_address = request({
        url: encodedURL,
        json: true,
    }, (error, response, body) => {
        weatherLogResponse(error, response, body);
    });
}

// Return the weather conditions of a location from darksky API

const getWeatherData = (lng, lat)  => {
    const url = "https://api.darksky.net/forecast/2e572d79f0a288a9003b19102c749c41/37.8267,-122.4233";
    const weather_condition = request({
        url: url,
        json: true,
    }, (error, response, body) => {
        weatherLogResponse(error, response, body);
    })
}



// --------------------------------------------EXPORT FUNCTIONS---------------------------------------------
module.exports = {
    addNote,
    deleteNote,
    readNote,
    findAddress,
    getWeatherData,
}

