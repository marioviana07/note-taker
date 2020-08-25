const { filterByQuery, findById, createNewNote, deleteNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
//const { resolveSoa } = require('dns');
console.log("NOTES", notes)
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
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
    const deletedNote = deleteNote({ id: req.params.id }, notes);
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