const mongoose = require('mongoose')
const schema = mongoose.Schema

const commentModel = new schema({
    date: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true
    }
})

module.exports = mongoose.model('Comment', commentModel)