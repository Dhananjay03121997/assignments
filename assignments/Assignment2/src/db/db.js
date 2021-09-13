let mongoose = require('mongoose');

//local database
// mongoose.connect('mongodb://127.0.0.1:27017/assignment',{
//     // useNewUrlParser: true
//     // ,useCreateIndex: true
//     // ,useUnifiedTopology: true
//     // ,useFindAndModify: false
// });

//live database
mongoose.connect('mongodb+srv://Dhananjay:Dhananjay@cluster0.rduer.mongodb.net/Assignment2?retryWrites=true&w=majority',{
    // useNewUrlParser: true
    // ,useCreateIndex: true
    // ,useUnifiedTopology: true
    // ,useFindAndModify: false
});