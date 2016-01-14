
function wait(seconds, callback) {
	setTimeout(function(){
		callback();
	}, 1000*seconds);
}

console.log('wait 3 started');
wait(3, function(){
  	console.log('wait 3 done');
 });

function repeat (times, callback) {
	
  for(var i = 0; i < times; i++){
  	callback(i);
  }
}

repeat(10, function(iteration){
	console.log(iteration + 100);
});

wait(4, function(){
	repeat(2, function(i){
		console.log('reating for i', i);
		wait(i * 3, function(){
			repeat(3, function(j){
				console.log('i',i,'j',j);
			});
		});
	});
});

var ds = require('./datastore.js');

function User () {
  
}

User.find = function (query, callback){
	var self = this;
	var error = null;
	var users = ds.User.filter(function (user) {
		return Object.getOwnPropertyNames(query).reduce(function(prev, curr) {
			if(!user.hasOwnProperty(curr)){
				error = new RangeError('query argument' + curr + 'is not a property of' + self.name + '"');
				return false;
			}
			if(typeof query[curr] !=typeof user[curr]){
				error = new TypeError('query arguments are incorrect types, `'+curr+'` is "'+ typeof(query[curr]) +'", expected "'+ typeof(user[curr]) +'"');
				return false;
			}
			return prev && query[curr] == user[curr];
		}, true);

	});
	callback(error, users);
};

User.find({id : 2}, function (err, users){
	if(err) throw err;
	console.log('users', users);
});

User.find({happy : true, iKonwIt : true }, function(err, users) {
	if(err) console.log(err.constructor.name, ":", err.message);
	console.log('users', users);
});

User.find({id : 4, name : 'davinci'}, function(err, users){
	if(err) throw err;
	console.log('users', users);
});

User.find({mood : 'elated'}, function(err, users){
	if(err) throw err;
	console.log('users', users);
});

User.find({id : 'two'}, function(err, users){
	if(err) console.log(err.constructor.name, ":", err.message);
	console.log('users', users);
});

module.exports = {
  wait : wait,
  repeat : repeat,
  User : User
};