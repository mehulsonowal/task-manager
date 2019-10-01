const express = require('express'); 
require('./db/mongoose');


const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

// MIDDLEWARE FUNCTION
// app.use((req, res, next) => {
//     if(req.method === 'GET') {
// 	res.send('GET requests are disabled!');
//     } else {
// 	next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Maintenance going on!');
// });

// MULTER EXAMPlE
// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits: {
// 	fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
// 	if(!file.originalname.match(/\.(doc|docx)$/)){
// 	    return cb(new Error('Please upload a Word Document'));
// 	}
	
// 	cb(undefined, true); // Accepted
// 	// cb(undefined, false); // Silenty rejected
//     }
// });

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware');
// };

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// }, (error, req, res, next) => { // last parameter handles errors
//     res.status(400).send({error: error.message});
// });

app.use(express.json()); //required for post requests since we are sending JSON information

// const router = new express.Router();
// router.get('/test', (req, res) => {
//     res.send('This is from my other router');
// });
//app.use(router);

app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // const task = await Task.findById('5d5b41a50ebeb033b8038cd8');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);

//     const user = await User.findById('5d5b419a0ebeb033b8038cd6');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// };

// main();
// Summary:
// 1. creating our web server using express.js
// 2. using mongoose as an API to abstract away mongodb
// 3. we are using http requests and functions to interact with our database and create an endpoint that can provide us data

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const pass = 'Red12345';
//     const hash = await bcrypt.hash(pass, 8);

//     console.log(pass);
//     console.log(hash);

//     const isMatch = await bcrypt.compare('red12345', hash);
//     console.log(isMatch);
// }
// myFunction();

// const pet = {
//     name: 'Hal'
// };

// whenever the stringify object is called the toJSON function is also called
// pet.toJSON = function () {
//     console.log(this);
//     return this;
// };


// console.log(JSON.stringify(pet));
