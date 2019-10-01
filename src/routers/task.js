const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

// Sample URL
// GET /tasks/?completed=false

// Pagination
// GET /tasks?limit=10&skip=10

// Sorting
// GET /tasks/?sortBy=createdAt:asc // or desc

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        // const tasks = await Task.find({owner: req.user._id});
        // alternative
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks); // using the virtual data
        //res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }

    // Task.find({}).then((tasks) => {
    // 	res.send(tasks);
    // }).catch((e) => {
    // 	res.status(500).send(e);
    // });
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        // const task = await  Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

    // Task.findById(_id).then((task) => {
    // 	if(!task){
    // 	    res.status(404).send();
    // 	}
    // 	else{
    // 	    res.send(task);
    // 	}
    // }).catch((e) => {
    // 	res.status(500).send(e);
    // });
});

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
        console.log('Task Created!');
    } catch (e) {
        res.status(500).send();
    }

    // task.save().then(() => {
    // 	res.status(201).send(task);
    // 	console.log('Task created!');
    // }).catch((e) => {
    // 	res.status(400).send(e);
    // });
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const updates = ['description', 'completed'];
    const isValidKey = update.every((update) => updates.includes(update));
    if (!isValidKey) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        // const update = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true });
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            res.status(404).send();
        }

        update.forEach((i) => task[i] = req.body[i]);
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    };
});

router.delete('tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        return res.status(500).send();
    }
});

module.exports = router;
