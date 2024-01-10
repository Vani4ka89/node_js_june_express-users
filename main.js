const express = require('express');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', (req, res) => {

});

app.get('/users/:id', (req, res) => {

})

app.post('/users', (req, res) => {

});

app.put('/users/:id', (req, res) => {

});

app.delete('/users/:id', (req, res) => {

});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});