const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
	pid: {
		type: Number,
		unique: true,
		required: true,
	},
	boardName:{
		type: String,
		unique: true,
		required: true,
	}
})

const board = mongoose.model('board', boardSchema);

module.exports = board;