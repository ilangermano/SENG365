const express = require('express');
const app = express();
const data = require('./users.json');
const users = data.users;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let response = `No user with id ${id}`;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            response = user;
            break;
        }
    }
    res.status(200).send(response);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send(users);
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    for (const user of users) {
        if (parseInt(id, 10) === updatedUser.id) {
            const index = users.indexOf(user);
            users[index] = updatedUser;
            break;
        }
    }
    res.status(200).send(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
    res.send(users);
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});


