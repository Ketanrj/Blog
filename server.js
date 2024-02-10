const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

PORT = 5000;

//Database config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db)
.then( () => console.log('Mongo DB connected'))
.catch(err => console.log('There is an error', err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT)
console.log(`Server Started on ${PORT}`);