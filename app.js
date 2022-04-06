const express = require('express');
const res = require('express/lib/response');
const app = express();
const usermodal = require('./models/user');
const mongoose = require('mongoose');

const DB_Name = "userdb";
const Password = "admin";
mongoose.connect(`mongodb+srv://admin:${Password}@cluster0.66qn3.mongodb.net/${DB_Name}?retryWrites=true&w=majority`)
    .then(() => { console.log("Database Connection Succesful.") }).catch(error => console.log(error));

//#region middlewares, run first.
//Body Allow - Json Body Parser.
app.use(express.json());
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
    usermodal.find({}, (err, records) => {
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
    usermodal.findById(id, (err, records) => {
        if (err) {
            res.send("Error: " + err);
        }
        else {
            res.send(records);
        }
    });
});

app.post('/api/user', (req, res) => {
    const obj = req.body;
    usermodal.create(obj)
        .then(_ => res.send("Record inserted successfuly."))
        .catch(error => res.send("Error: " + error));
});

app.put('/api/user', (req, res) => {
    const obj = req.body;
    usermodal.updateOne({ fname: "Areesha" }, obj, (err, docs) => {
        if (err) {
            res.send("Update Error: " + err);
        }
        else {
            res.send(obj);
        }
    });
});

app.delete('/api/user', (req, res) => {
    usermodal.deleteMany({ fname: "Tahir", lname: "Mahmood" })
        .then(
            res.send("Record Deleted.")
        )
        .catch(err => res.send("Error: " + err));
});



app.all('*', (req, res) => {
    res.send('Sorry Wrong URL');
})

app.listen(process.env.PORT || 300, () => console.log('Server is running..'));




// app.get('/getData/:id/getDataName/:name', (req, res) => {
//     const id = req.params.id;
//     const name = req.params.name;
//     res.send('Your id is: ' + id + ' & name is: ' + name);
// })