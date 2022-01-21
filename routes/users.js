const express = require("express");
const router = express.Router(); // adds modularity

router.get('/', (req, res) => {
  res.send("hello users")
})

module.exports = router;