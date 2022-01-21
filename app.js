
//dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const layout = require("./views/layout");
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users')




db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })


//logging middleware
app.use(morgan('dev'));

//static middleware; sets up route 
app.use(express.static(__dirname + "/public"));

//body parsing middleware
app.use(express.urlencoded({extended: true}));

//Routers
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get("/", (req, res) => {
  res.redirect('/wiki')

})
const PORT = 1337;

const syncDb  = async () => {
  // await Page.sync({force: true});
  // await User.sync({force: true});
  await db.sync({force: true});
}
syncDb();

// can be inside syncDB to prevent res coming in before database is sync
app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
})
