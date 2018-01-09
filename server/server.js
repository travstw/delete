const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
        
    }).catch((e) => {
        res.status(400).send(e);
    })

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.send({todo});
            }
        }).catch((e) => {
            res.status(400).send();
        }); 
    }
})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.send({todo});
            }
        }).catch((e) => {
            res.status(400).send();
        }); 
    }
})



app.listen(port, () => {
    console.log(`server started at ${port}`);
});



module.exports = {app};