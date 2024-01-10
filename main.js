const express = require('express');
const {read, write} = require('./user.service');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    try {
        const users = await read();
        res.status(200).json({data: users});
    } catch (e) {
        res.status(400).json('Error')
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            throw new Error('Wrong ID param')
        }
        const users = await read();
        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            throw new Error('User not found')
        }
        res.status(200).json({data: users[index]})
    } catch (e) {
        res.status(400).json('Error')
    }
})

app.post('/users', (req, res) => {
    const newUser = req.body;

    res.status(200).json(newUser);
});

app.put('/users/:id', (req, res) => {

});

app.delete('/users/:id', (req, res) => {

});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});