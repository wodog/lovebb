var mongoose = require('mongoose');
var fs = require('fs');
var path  = require('path');
var debug = require('debug')('test');

debug('begin....................');

var data_path = path.resolve(__dirname, './data/sentences.txt');
debug(data_path);

var data = fs.readFileSync(data_path, 'utf8');
debug(data);

var sentences_obj = {
	contents: [],
	seqs: []
};

var sentences = data.split('\n');
sentences.forEach(function(sentence) {
	sentences_obj.contents.push(sentence.split('-')[1].trim());
	sentences_obj.seqs.push(sentence.split('-')[0].trim());
});

debug(sentences_obj);


mongoose.connect('mongodb://121.42.62.149/lovebb');

var schema = new mongoose.Schema({
	seq: Number,
	content: String
});

var Sentence = mongoose.model('sentence', schema);

for(var i = 0; i<sentences_obj.seqs.length; i++){
	var sentence = new Sentence({
		seq: sentences_obj.seqs[i],
		content: sentences_obj.contents[i]
	});
	sentence.save();
}
/*
Movie.find({}, function(err, data){
	if(err) throw err;
	console.log(data);
});

*/
