const express =require('express');
const bodyParser =require('body-parser');
const morgan =require('morgan');
var cors = require('cors')
const mongoose =require('mongoose');
const blogRoutes = require('./src/routes/blogRoutes');
const userRoute=require('./src/routes/userRoutes');

require('dotenv').config();
// const blogRoutes =require('./src/routes');

const app=express();
app.use(cors())


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database is Connected.'))
    .catch((err) => console.log(err));


//logging package
app.use(morgan('dev'));

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
        'Origin, X-Requested-With, ' +
        'Content-Type,Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});




//localhost:8080/blog/
app.use('/blog', blogRoutes);
app.use('/user',userRoute)
// app.use()

app.listen(process.env.PORT,()=>{console.log(`Server is connected and running on Port ${process.env.PORT}`)})