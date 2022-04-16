const express = require('express');
const app = express();
const usermodal = require('./models/user');
const todoModal = require('./models/UserTodo');
const mongoose = require('mongoose');
var cors = require('cors');
const UserTodo = require('./models/UserTodo');
app.use(cors()) // Use this after the variable declaration

const DB_Name = "userdb";
const Password = "admin";
mongoose.connect(`mongodb+srv://admin:${Password}@cluster0.66qn3.mongodb.net/${DB_Name}?retryWrites=true&w=majority`)
    .then(() => { console.log("Database Connection Succesfull.") }).catch(error => console.log(error));

//#region middlewares, run first.
app.use(express.json()); //Body Allow <- Json Body Parser.
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    if (false) {
        res.send("Invalid Request!");
    }
    else {
        next();
    }
})
//#endregion

app.get('/api/user', (req, res) => {
    usermodal.find({}, { __v: 0 }, (err, records) => {
        if (err) {
            res.send("Error: " + err);
        }
        else {
            res.send(records);
        }
    });
});

//Get User By Id.
app.get('/api/userById', (req, res) => {
    let id = req.query.id;
    usermodal.findById(id, (err, obj) => {
        if (err) {
            res.send("Error: " + err);
        }
        else {
            res.send(obj);
        }
    });
});

app.post('/api/user', (req, res) => {
    debugger
    const obj = req.body;
    usermodal.create(obj)
        .then(e => {
            res.send(e);
        })
        .catch(error => res.send("Error: " + error));
});

app.put('/api/user', (req, res) => {
    debugger
    const obj = req.body;
    console.log(obj);
    usermodal.findByIdAndUpdate(obj._id, obj, (err, docs) => {
        if (err) {
            res.send("Update Error: " + err);
        }
        else {
            // usermodal.findById(obj._id, (err, obj) => {
            //     res.send(obj);
            // })
            res.send(docs);
        }
    });
});

app.delete('/api/user', (req, res) => {
    const id = req.query.id;
    todoModal.deleteMany({ UserId: id }).then(e => {
        usermodal.deleteMany({ _id: id })
            .then(e => res.send("Record Deleted.") )
            .catch(err => res.send("Error: " + err));
    }).catch(e => console.log(e));
});

app.post('/api/userlogin', (req, res) => {
    const user = req.body;
    console.log(user);//user == { email: 'ahmediftikhar@gmail.com', password: '1212' }
    usermodal.findOne(user, (err, obj) => {
        if (err) {
            res.send(false);
        }
        else {
            res.send(obj);
        }
    });
});

/*----------------------  TODO  ------------------------- */
//Get all todo's
app.get('/api/todo', (req, res) => {
    const userId = req.query.userId;
    const private = req.query.IsPrivate;
    todoModal.find({ $or: [{ UserId: userId }, { IsPrivate: private }] }, { __v: 0 }, (err, records) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log(records)
            res.send(records);
        }
    });
});

app.post('/api/todo', (req, res) => {
    const obj = req.body;
    todoModal.create(obj)
        .then(obj => res.send(obj)).catch(e => res.send("Error: " + e));
});

app.put('/api/todo', (req, res) => {
    const objTodo = req.body;
    todoModal.findByIdAndUpdate(objTodo._id, objTodo, (err, docs) => {
        if (err) {
            res.send("Errro: " + err)
        }
        else {
            todoModal.findById(objTodo._id, (err, obj) => {
                res.send(obj);
            })
        }
    });
});

app.delete('/api/todo', (req, res) => {
    const id = req.query.id;
    todoModal.deleteMany({ _id: id })
        .then(
            res.send("Todo Deleted.")
        )
        .catch(err => res.send("Error: " + err));
});

//Get todo By Id.
app.get('/api/todoById', (req, res) => {
    let id = req.query.id;
    todoModal.findById(id, (err, obj) => {
        if (err) {
            res.send("Error: " + err);
        }
        else {
            res.send(obj);
        }
    });
});


app.all('*', (req, res) => {
    res.send('Sorry Wrong URL');
})

app.listen(process.env.PORT || 9000, () => console.log('Server is running..'));




// app.get('/getData/:id/getDataName/:name', (req, res) => {
//     const id = req.params.id;
//     const name = req.params.name;
//     res.send('Your id is: ' + id + ' & name is: ' + name);
// })