const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});




// const sleep = new Task({
//     completed: false
// });

// sleep.save().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

// const me = new User({
//     name: 'Bill',
//     age: 10,
//     email: 'email@email.com',
//     password: 'bestwordpass'
// });


// me.save().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log('Error', error);
// });
