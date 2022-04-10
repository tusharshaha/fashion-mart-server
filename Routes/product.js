const express = require('express');
const router = express.Router()

router.get('/home', (req, res) => {
    res.send("this is home")
})
router.get('/about', (req, res) => {
    res.send("this is about")
})

module.exports = router