
console.log('Starting App...');

// NPM Module imports
const yargs = require('yargs')
const lodash = require('lodash')
const request = require('request')

// Project Imports
const notes = require('./notes');

const titleFlag = {
            description: 'Title of the note',
            demand: true,
            alias: 't'
        };

const bodyFlag = {
            description: 'body of the note',
            demand: true,
            alias: 'b'
        }

const argv = yargs
    .command('add','Add a new note',{
        title: titleFlag,
        body: bodyFlag
    })
    .command('delete','Remove a note',{
        title: titleFlag
    })
    .command('read-note','Read a note', {
        title: titleFlag
    })
    .command('list', 'List all Notes')
    .command('find-address','Find the address of a location ',{
        location:{
            describe: 'Location to find',
        demand: true,
        alias: 'l'
        }
    })
    .help()
    .argv;
const command = argv._[0];


if ( command === 'list' ) {
    console.log('Listing notes');
} else if ( command === 'add' ) {

   noteAddedSuccess =  notes.addNote(argv.title, argv.body);

   if (noteAddedSuccess) {
       console.log('Note Added Successfully');
   }else{
       console.log('Note Already exist');
   }
} else if ( command === 'delete') {
    if (notes.deleteNote(argv.title)) {
         console.log('Note is deleted.')
    }else{
        console.log('Note not found.')
    }
   
} else if ( command === 'read-note' ) {
    console.log( 'Reading Note ' );
    let note = notes.readNote(argv.title);
    if(note){
        console.log('-------------------------------');
        console.log('Note Content');
        console.log(note.body);
    }else{
        console.log('Could not find the note.');
    }
}else if(command === 'find-address'){
   let location_detail =  notes.findAddress(argv.location);
   if (!location_detail) {
       console.log('Unable to connect to map server.');
   }else if(location_detail.body.status === 'ZERO_RESULT'){
       console.log('Could not find the specified Address');
       notes.getWeatherData(1,3);
   }else{
       setTimeout(() => console.log('Fetching Address Data'), 1000);
       setTimeout(() => console.log('Spreading Data...'), 1000);
       setTimeout(() => console.log('Please Wait...'), 1000);
       setTimeout(() => console.log('---------------------------------'), 1000);
       setTimeout(() => console.log(`Address: ${location_detail.body.results[0].formatted_address}`), 1000);
       setTimeout(() => console.log(`Longitude: ${location_detail.body.results[0].geometry.location.lng}`), 1000);
       setTimeout(() => console.log(`Latitude:: ${location_detail.body.results[0].geometry.location.lat}`), 1000);


   }
}