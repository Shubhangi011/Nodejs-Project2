const express = require('express');
const Person = require('./../Models/Person');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;   //Assuming the request body contains the person data 

        //creating a Person document using the Person model
        const newPerson = new Person(data);

        //Saving the document to the database
        const savedPerson = await newPerson.save();
        console.log('Data Saved Successfully!');
        res.status(201).json(savedPerson);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server error." });
    }
});
//create person router
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched successfully.");
        res.status(200).json(data)
    } catch (err) {
        onsole.log(err);
        res.status(500).json({ err: "Internal Server error." });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'Chef' || workType == 'Manager' || workType == 'Owner' || workType == 'Waiter') {
            const response = await Person.find({ work: workType });
            console.log("Person fetched based on workType.");
            res.status(200).json(response);

        } else {
            res.status(404).json({ Msg: "Invalid worktype." });
        }

    } catch (err) {
        res.status(500).json({ Error: 'Internal Server error.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatepersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatepersonData, {
            new: true,
            runValidators: true
        });
        res.status(200).json(response);
        console.log('Data updated successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).json({ Msg: 'Internal Server error.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(personId);
        if (!deletedPerson) {
            return res.status(404).json({ Error: 'Person not found' });
        }
        res.status(200).json({ Msg: 'Person deleted successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Msg: 'Internal server error.' });
    }


})

module.exports = router;


