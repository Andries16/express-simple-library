const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    writerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        required: true,
    }
})

module.exports = mongoose.model('Book', bookSchema)