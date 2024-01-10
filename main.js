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
        res.status(400).json(e.message);
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
        res.status(400).json(e.message);
    }
})

app.post('/users', async (req, res) => {
    try {
        const {email, name, age} = req.body;

        if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
            throw new Error('Wrong age');
        }
        if (!email || !email.includes('@')) {
            throw new Error('Wrong email');
        }
        if (!name || name.length <= 3) {
            throw new Error('Wrong name');
        }
        const users = await read();
        const newUser = {id: users[users.length - 1].id + 1, email, name, age};
        users.push(newUser);
        await write(users);

        res.status(201).json({data: newUser});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {email, age, name} = req.body;

        if (!Number.isInteger(id)) {
            throw new Error('Wrong ID param')
        }
        if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
            throw new Error('Wrong age');
        }
        if (!email || !email.includes('@')) {
            throw new Error('Wrong email');
        }
        if (!name || name.length <= 3) {
            throw new Error('Wrong name');
        }

        const users = await read();
        const user = users.find(user => user.id === id);

        if (!user) {
            throw new Error('User not found')
        }
        user.name = name;
        user.age = age;
        user.email = email;

        await write(users);
        res.status(201).json({data: user});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {email, age, name} = req.body;

        if (!Number.isInteger(id)) {
            throw new Error('Wrong ID param')
        }
        if (age && (!age || !Number.isInteger(age) || age <= 0 || age > 100)) {
            throw new Error('Wrong age');
        }
        if (email && (!email || !email.includes('@'))) {
            throw new Error('Wrong email');
        }
        if (name && (!name || name.length <= 3)) {
            throw new Error('Wrong name');
        }

        const users = await read();
        const user = users.find(user => user.id === id);

        if (!user) {
            throw new Error('User not found')
        }
        if (name) user.name = name;
        if (age) user.age = age;
        if (email) user.email = email;

        await write(users);
        res.status(201).json({data: user});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.delete('/users/:id', async (req, res) => {
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
        users.splice(index, 1);
        await write(users);
        res.status(204).json({message: 'User deleted'});
    } catch (e) {
        res.status(400).json(e.message);
    }

});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});