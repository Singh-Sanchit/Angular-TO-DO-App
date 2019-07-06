const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    taskDate: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
    },
    receivedBy: {
        type: String,
        default: "self",
    },
    createdOn: {
        type: String,
        default: Date()
    },
    lastModifiedOn: {
        type: String,
        default: Date()
    }
});

module.exports = mongoose.model('Task',taskSchema);
