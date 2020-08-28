const { filterByQuery, findById, createNewNote, deleteNote, validateNote } = require('../../lib/notes');
var { notes } = require('../../db/db.json');
//const { resolveSoa } = require('dns');
console.log("NOTES", notes)
const router = require('express').Router();

router.get('/notes', (req, res) => {

    notes = require('../../db/db.json').notes
    console.log("all notes")
    console.log(notes)
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    //update the value of notes before you return them.
    //Which is to say, read the db.json files into notes again.

    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    console.log("----")
    console.log("HERE IS NOTES")
    console.log(notes)
    console.log("----")
    req.body.id = notes.length.toString();
    if (!validateNote(req.body)) {
        res.status(400).send('Incorrect Format');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// router.post('/notes', (req, res) => {
//     console.log(notes)
//     req.body.id = notes.length.toString();

//     if (!validateNote(req.body)) {
//         res.status(400).send('Incorrect Format');
//     } else {
//         const note = createNewNote(req.body, notes);
//         res.json(note);
//     }
// });

router.delete('/notes/:id', function(req, res) {
    console.log("Deleting note with id: " + req.params.id)
    console.log("Notes before delete: ")
    console.log(notes)
    const deletedNote = deleteNote({ id: req.params.id }, notes);
    console.log("note after delete: ")
    console.log(notes)
    const result = {
        message: 'bad request',
        status_code: 400,
        body: null
    };
    if (deletedNote) {
        result.message = "success";
        result.status_code = 200;
        result.body = deletedNote;
    }

    return res.json(result);

});

module.exports = router;