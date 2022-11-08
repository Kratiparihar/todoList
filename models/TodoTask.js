const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    //schemaa

    content: {
        type: String,
        required: true,
        trim: true,
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
});


// create new collection 
const todoData = new mongoose.model("todo", todoSchema);
module.exports = todoData;