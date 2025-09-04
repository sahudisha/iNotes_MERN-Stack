const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1 : Fetch All Notes for an user: GET "/api/notes/fetchallnotes". Require Authentication
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        let notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//ROUTE 2 : Add a Note for an user: POST "/api/notes/addnote". Require Authentication
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Enter a valid description.').isLength({ min: 5 }),
], async (req, res) => {

    //if there are errors, return bad request with error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const { title, description, tag } = req.body;
    try {
        var note = await Note({
            title, description, tag,
            user: req.user.id
        })

        const savedNote = await note.save();
        return res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//ROUTE 2 : Add a Note for an user: PUT "/api/notes/updatenote". Require Authentication
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Enter a valid description.').isLength({ min: 5 }),
], async (req, res) => {

    //if there are errors, return bad request with error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const { title, description, tag } = req.body;
    try {
        //Create a newNote Object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})


module.exports = router;