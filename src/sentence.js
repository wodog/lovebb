var mongoose = require('mongoose');

mongoose.connect('mongodb://121.42.62.149/lovebb');

var sentenceSchema = new mongoose.Schema({
	seq: Number,
	content: String
});

var Sentence = mongoose.model('sentence', sentenceSchema);

module.exports = Sentence;
