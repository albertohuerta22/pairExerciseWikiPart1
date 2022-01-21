const express = require("express");
const router = express.Router(); // adds modularity
// const { addPage } = require("../views")
const addPage = require('../views/addPage');
const { Page } = require('../models/index') // gains access to page db
const wikiPage = require('../views/wikipage')


// this gets '/' === /wiki
router.get('/', (req, res) => {
  res.send("hello world")
})

// router.post('/', (req, res) => {
//   res.json(req.body)
// })

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

// this gets '/add' === /wiki/add
router.get('/add', (req, res) => {
  res.send(addPage()) // sends result of func --> html
})

router.get('/:slug', async (req, res, next) => {
  try {
  // res.send(`hit dynamic route at ${req.params.slug}`)
  const page = await Page.findOne({
    where: {
      slug : req.params.slug
    }
  });
  // res.json(page) // provides json for page
  res.send(wikiPage(page, 'Alberto'))
} catch (error) {next(error)}
});

module.exports = router;