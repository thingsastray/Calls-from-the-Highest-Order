# Calls from the Highest Order

Callback functions in Javascript

it is highly recommended to have completed [Sir-Mix-Alot](https://github.com/devleague/Sir-Mix-Alot) first.

### Goal

Write and invoke callback functions. Practice asynchronous execution in sequence.

### Install Dependencies

```
npm install
```

### Run tests

```
mocha -w --bail
```

### Callbacks

do all work in `lib/callbacks.js`

#### wait

declare a function named `wait` that accepts two arguments, `seconds` and `callback`.

`wait` will invoke the `callback` function after `n` seconds, where `n` is the value of the `seconds` argument.

##### test wait

log the message "wait 3 started".  
invoke `wait` with `3` as the first argument, and an unnamed callback function as the second argument.  
the unnamed callback function logs the message "wait 3 done".

the expected behavior is that the first message will be printed out to the console immediately, then the second message will be printed out to the console after 3 seconds.

#### repeat

declare a function named `repeat` that accepts two arguments, `times` and `callback`.

`repeat` will invoke the `callback` function `n` many times, where `n` is the value of the `times` argument.

`callback` will be invoked with one argument passed in, which is the value of the iteration step in which it was invoked. the first time `callback` is invoked, `0` will be passed to it, the third time `callback` is invoked, `2` will be passed to it.

##### test repeat

invoke the `repeat` function passing in `10` as the first argument, and a callback function for the second argument.  
the callback function accepts one argument, `iteration`.  
the callback function logs the result of adding `100` to the value of `iteration`.  

the expected behavior is that the numbers 100 through 109 will be printed out to the console.

##### test wait and repeat

Perform the following sequence:

1. wait 4 seconds seconds before continuing to the next step
1. repeat the following steps 2 times
1. log "repeating for i `[n]`" where `[n]` is current iteration from `repeat`
1. wait `[n] * 3` seconds before continuing to the next step, where `n` is the current iteration from `repeat`
1. repeat the following steps 3 times
1. log the following message `"i [n] j [m]"` where `[n]` is the current iteration from step 2. and `[m]` is the current iteration from step 5.

the expected behavior is that, after 3 seconds, the following will be printed out to the console

```
wait 3 done
repeating for i 0
repeating for i 1
i 0 j 0
i 0 j 1
i 0 j 2
```

then after 3 more seconds, this will be printed out to the console

```
i 1 j 0
i 1 j 1
i 1 j 2
```

### Find Users

1. Import the module found in `./datastore.js`
1. Create an empty class named `User` with a constructor that takes 0 arguments.
1. Add a static method named `find` to the `User` class that takes 2 arguments, `query` and `callback`
1. the `find` function will invoke the `callback` function, passing back all user objects from the datastore, where every key found in the `query` argument, matches the value of the matching key in the user object from the datastore.
1. if `query` has a key that does not exist in the _imaginary_ user schema, invoke the `callback` function passing back a javascirpt `RangeError` with a very descriptive error message.
1. if `query` has a key that does exist in the _imaginary_ user schema, however the values of the `query` param and the `user` param are of different types, invoke the `callback` function passing back a javascirpt `TypeError` with a very descriptive error message.

The `callback` function signature is `function(error, users)`  
where `error` is an `Error` object if there are any errors, else is `null`  
and `users` is an array containing any users found by the query.

#### test finding users

Invoke the `User.find` method with  
`query` : `{ id : 2 }`  
`callback` : function with two parameters, `error` and `users`  
if the error is not null, `throw` the error  
log a message with `'users'` and the `users` result

the expected result of the callback function is

```
users [ { id: 2, name: 'goldstine', mood: 'reverent' } ]
```

---

Invoke the `User.find` method with  
`query` : `{ happy : true, iKnowIt : true }`  
`callback` : function with two parameters, `error` and `users`  
if the error is not null, log the error type, ":", and the error message  
log a message with `'users'` and the `users` result

the expected result of the callback function is

```
RangeError : query argument `iKnowIt` is not a property of "User"
users []
```

---

Invoke the `User.find` method with  
`query` : `{ id : 4, name : "davinci" }`  
`callback` : function with two parameters, `error` and `users`  
if the error is not null, `throw` the error  
log a message with `'users'` and the `users` result

the expected result of the callback function is

```
users [ { id: 4, name: 'davinci', mood: 'elated' } ]
```

---

Invoke the `User.find` method with  
`query` : `{ mood : "elated" }`  
`callback` : function with two parameters, `error` and `users`  
if the error is not null, `throw` the error  
log a message with `'users'` and the `users` result

the expected result of the callback function is

```
users [ { id: 3, name: 'curie', mood: 'elated' },
  { id: 4, name: 'davinci', mood: 'elated' },
  { id: 5, name: 'mccarthy', mood: 'elated' } ]
```

---

Invoke the `User.find` method with  
`query` : `{ id : "two" }`  
`callback` : function with two parameters, `error` and `users`  
if the error is not null, log the error type, ":", and the error message  
log a message with `'users'` and the `users` result

the expected result of the callback function is

```
TypeError : query arguments are incorrect types, `id` is "string", expected "number"
users []
```
