var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient

const dbUrl = 'mongodb://localhost:27017/BYUDict'

var collection

MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', dbUrl);
    collection = db.collection('BYUDict')
  }
});

router.get('/', function(req, res, next) {
 collection.find().toArray(function(err, result) {
    		if(err) {
      			console.log(err);
    		} else if (result.length) {
      			console.log("Query Worked");
      			console.log(result);
      			res.send(result);
    		} else {
      			console.log("No Documents found");
    		}
	})

});

router.get('/search/:word', function(req, res, next) {
	console.log(req.params.word)
	const find = req.params.word
	if(find === 'random') {
		collection.find({}).toArray(function(err, result) {
			const random = Math.floor(Math.random() * result.length)
			console.log(result.length)
			console.log('random number is ' +random)
			const toSend = result[random] 
			console.log(toSend)
			res.send(toSend)
		})
	return
	}
	
	collection.find({ word: find}).toArray(function(err, result) {
		let temp = result[0]
		if(temp) {
			console.log(temp)
			temp.clicks++
			console.log(temp)
			collection.replaceOne({word: temp.word}, temp)
			res.send(temp)
		}
		else res.send(false)
	})

})

router.post('/new', function(req, res, next) {
	collection.find({word: req.body.word}).toArray(function(err, results) {
		console.log(results)
		if(results.length === 0) {
			console.log('nothing found')
			collection.insert(req.body)
			res.send(true)
		}
		else res.send(false)

		})
	
})

router.put('/def', function (req, res) {
	collection.find({word: req.body.word}).toArray(function(err, result) {
		let thing = result[0]
		let array = []
		let pros = []
		for(let i = 0; i < thing.def.length; i++) {
			array.push(thing.def[i])
			pros.push(thing.pro[i])
		}
		array.push(req.body.def)
		pros.push(req.body.pro)
		
		thing.pro = pros
		thing.def = array
		console.log(thing)
		collection.replaceOne({word: thing.word}, thing)
		res.send('updated ' + thing.word)
	})
})


router.get('/top', function(req, res) {
	collection.find({}).toArray(function(err, results) {
		const test = results.sort((a, b) => (parseInt(b.clicks)-parseInt(a.clicks)))
		console.log(test)
		let toSend = []
		for(let i = 0; i < test.length; i++) {
			if(i > 24) i = test.length
			else {
				console.log(test[i])
				toSend.push(test[i])
			}
		}
		res.send(toSend)
	})

})

module.exports = router;
