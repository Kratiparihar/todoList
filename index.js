const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const TodoTask = require("./models/TodoTask");
app.use(express.json());
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

//connection to db



const url = process.env.MONGO_DB_CONNECTION;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    }).catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

app.listen(port, () => {
    console.log(`Connection active port ${port}`)
})

app.set("view engine", "ejs");

//Get method

app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

//Post Method
// app.post('/',(req, res) => {
//     console.log(req.body);
//     });

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//UPDATE
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});



// mongoose.set("useFindAndModify", true);